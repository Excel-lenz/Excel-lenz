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
import { formatCurrency } from "../utils/currency.jsx";
import { useCurrencySettings } from "../context/currencySettingsContext.jsx";

// imports for progressbar - data
import { getCapital } from "../api/funcs.jsx";
import { getOverallGoal } from "../api/progress/progressbar.jsx";
import { getTransactions } from "../api/inputs/inputAPI";



export default function Dashboard({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen})
{
    const [capital, setCapital] = useState("");
    const [goal, setGoal] = useState("");
    const [progressPercentage, setProgressPercentage] = useState("");
    const [transactions, setTransactions] = useState([]);
    const { currencySettings } = useCurrencySettings();

    const refreshProgress = async () => {
      try {
        const [capitalData, goalData, transactionData] = await Promise.all([
          getCapital(),
          getOverallGoal(),
          getTransactions(),
        ]);

        setCapital(Number(capitalData.capital || 0));
        setGoal(Number(goalData.goal || 0));
        setTransactions(transactionData);
        setProgressPercentage(goalData.goal ? Math.round((capitalData.capital / goalData.goal) * 100) : 0)
      } catch (err) {
        console.error("Fehler beim Laden des Kapitals:", err);
      }
    };
  
    useEffect(() => {
        refreshProgress();
      }, []);

    const missingAmount = Math.max(Number(goal || 0) - Number(capital || 0), 0);


  return (
    <div className="layout">
      <Input onCreated={refreshProgress}/>

      <Topbar />
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        salesOpen={salesOpen}
        setSalesOpen={setSalesOpen}
        financeOpen={financeOpen}
        setFinanceOpen={setFinanceOpen}
      />

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
            <span>{formatCurrency(capital, currencySettings)} / {formatCurrency(goal, currencySettings)}</span>
          </div>
        </section>

        <section className="chartCard">
          <ChartPlaceholder
            transactions={transactions}
            capital={capital}
            goal={goal}
            currencySettings={currencySettings}
          />
        </section>

        <section className="cards">
         <Tooltip text="Zeigt, ob dein Startup finanziell im Plan liegt.">
            <CriticalNotes
              isCritical={Number(capital) < Number(goal) * 0.5}
              title={Number(capital) < Number(goal) * 0.5 ? "Kritische Hinweise" : "Voll auf Kurs"}
              text={Number(capital) < Number(goal) * 0.5 ? "Das Kapital liegt deutlich unter dem Zielwert." : "Kapitalentwicklung und Ziel stehen solide im Plan."}
            />
          </Tooltip>
          
          <Tooltip text="Das nächste große Finanzziel, das erreicht werden soll.">
            <Card title="Nächster Meilenstein">75% - {formatCurrency(missingAmount, currencySettings)} fehlen</Card>
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
