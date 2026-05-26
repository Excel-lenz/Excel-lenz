import React from "react";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import ChartPlaceholder from "../components/ChartPlaceholder";
import Card from "../components/Card";
import Tooltip from '../components/Tooltip';
import "../styles/pages/dashboard.css";
import Streak from "../components/streak"


export default function Dashboard({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen})
{
  return (
    <div className="layout">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        salesOpen={salesOpen}
        setSalesOpen={setSalesOpen}
        financeOpen={financeOpen}
        setFinanceOpen={setFinanceOpen}
      />

      <main className="main">
<main className="main">
        <header className="header">
          <div>
            <h1 className="title">Umsatzziel Fortschritt</h1>
            <p className="subtitle">Live Überblick über deine Performance</p>
          </div>
        </header>

        <section className="progressSection">
          <ProgressBar value={68} />
          <div className="progressMeta">
            <span>68% erreicht</span>
            <span>€136.000 / €200.000</span>
          </div>
        </section>

        <section className="chartCard">
          <ChartPlaceholder />
        </section>

        <section className="cards">
          <Tooltip text="Zeigt, ob dein Startup finanziell im Plan liegt.">
            <Card title="Status">Auf Kurs</Card>
          </Tooltip>
          
          <Tooltip text="Das nächste große Finanzziel, das erreicht werden soll.">
            <Card title="Nächster Meilenstein">75% – €14.000 fehlen</Card>
          </Tooltip>
          
          <Tooltip text="Deine Performance im Vergleich zur Vorwoche.">
            <Card title="Performance">+12% diese Woche</Card>
          </Tooltip>
          
          <Tooltip text="Entwicklung deines Umsatzes über die Zeit.">
            <Card title="Zieltrend">Stark wachsend</Card>
          </Tooltip>
          
          <Streak></Streak>
        </section>
      </main>
    </div>
  );
}