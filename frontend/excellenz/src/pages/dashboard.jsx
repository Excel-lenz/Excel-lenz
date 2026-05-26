import React from "react";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import ChartPlaceholder from "../components/ChartPlaceholder";
import Card from "../components/Card";
import "../styles/dashboard.css";
import Tooltip from '../components/Tooltip';

export default function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <h1 className="title">Fortschritt: Umsatzziel</h1>
        <ProgressBar value={68} />
        <ChartPlaceholder />
          <div className="cards">
              <Tooltip text="Zeigt, ob dein Startup finanziell im Plan liegt.">
                  <Card title="Status">Auf Kurs</Card>
              </Tooltip>

              <Tooltip text="Dein aktueller Umsatz im Vergleich zum Gesamtziel.">
                  <Card title="Aktueller Fortschritt"> >68% - €136.000</Card>
              </Tooltip>

              <Tooltip text="Das nächste große Finanzziel, das erreicht werden soll.">
                  <Card title="Nächster Meilenstein"> >75% - noch €14.000</Card>
              </Tooltip>

              <Tooltip text="Anzahl der aufeinanderfolgenden Tage, an denen du deine Finanzen gepflegt hast.">
                  <Card title="Streak">🔥 12 Tage</Card>
              </Tooltip></div>
      </main>
    </div>
  );
}
