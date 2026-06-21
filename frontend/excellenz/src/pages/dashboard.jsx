import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import ProgressBar from "../components/progressBar";
import ChartPlaceholder from "../components/chartPlaceholder";
import Card from "../components/card";
import "../styles/pages/dashboard.css";
import Streak from "../components/streak"
import Popup, {InfoPopup, WarningPopup, SuccessPopup} from "../components/popup.jsx";
import Topbar from "../components/topbar.jsx"
import Input from "../components/inputs.jsx";
import Tooltip from "../components/tooltip.jsx";
import CriticalNotes from "../components/criticalNotes.jsx";

// imports for progressbar - data
import { getCapital } from "../api/funcs.jsx";
import { getOverallGoal } from "../api/progress/progressbar.jsx";



export default function Dashboard({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen})
{
    const [capital, setCapital] = useState("");
    const [goal, setGoal] = useState("");
    const [progressPercentage, setProgressPercentage] = useState("");

    const refreshProgress = async () => {
      try {
        const capitalData = await getCapital();
        const goalData = await getOverallGoal();
        setCapital(capitalData.capital);
        setGoal(goalData.goal);
        setProgressPercentage(Math.round((capitalData.capital/goalData.goal)*10))
      } catch (err) {
        console.error("Fehler beim Laden des Kapitals:", err);
      }
    };
  
    useEffect(() => {
        refreshProgress();
      }, []);


  return (
    <div className="layout">

      <main className="main">
        <header className="header">
          <div>
            <h1 className="title">Umsatzziel Fortschritt</h1>
            <p className="subtitle">Live Überblick über deine Performance</p>
          </div>
          
        </header>

        <section className="progressSection">
          <ProgressBar value={progressPercentage} />
          <div className="progressMeta">
            <span>{progressPercentage}% erreicht</span>
            <span>{capital}€ / {goal}€</span>
          </div>
        </section>

        <section className="chartCard">
          <ChartPlaceholder />
        </section>

        <section className="cards">
         <Tooltip text="Zeigt, ob dein Startup finanziell im Plan liegt.">
            <CriticalNotes></CriticalNotes>
          </Tooltip>
          
          <Tooltip text="Das nächste große Finanzziel, das erreicht werden soll.">
            <Card title="Nächster Meilenstein">75% – €14.000 fehlen</Card>
          </Tooltip>
          
          <Tooltip text="Deine Performance im Vergleich zur Vorwoche.">
            <Card title="Performance">+12% diese Woche</Card>
          </Tooltip>
          
          <Tooltip text="Zeigt deine Aktuelle Login-Streak an.">
            <Streak></Streak>
          </Tooltip>
        </section>
      </main>
    </div>
  );
}
