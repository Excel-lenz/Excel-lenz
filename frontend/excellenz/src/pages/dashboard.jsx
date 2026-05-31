import React from "react";
import Sidebar from "../components/sidebar";
import ProgressBar from "../components/progressBar";
import ChartPlaceholder from "../components/chartPlaceholder";
import Card from "../components/card";
import "../styles/pages/dashboard.css";
import Streak from "../components/streak"
import Popup, {InfoPopup, WarningPopup, SuccessPopup} from "../components/popup.jsx";

export default function Dashboard({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen})
{
  return (
    <div className="layout">

      <WarningPopup/>

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
          <Card title="Status">Auf Kurs</Card>
          <Card title="Nächster Meilenstein">75% – €14.000 fehlen</Card>
          <Card title="Performance">+12% diese Woche</Card>
          <Card title="Zieltrend">Stark wachsend</Card>
          <Streak></Streak>
        </section>
      </main>
    </div>
  );
}
