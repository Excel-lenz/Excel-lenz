import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ErfolgsProvider, useErfolg } from "../components/erfolgscontext";
import ProgressBar from "../components/ProgressBar";
import ChartPlaceholder from "../components/ChartPlaceholder";
import Card from "../components/Card";
import "../styles/dashboard.css";
import DerKleineTod from "../assets/DerKleineTod.gif";

function DashboardInhalt() {
  /*
  const { zeigeErfolg } = useErfolg();

  useEffect(() => {
    zeigeErfolg({
      title: "🎉 Test-Erfolg",
      goalName: "Umsatzziel erreicht",
      reward: "+100 Punkte",
      gif: DerKleineTod
    });
  }, []);
*/
  return (
    <main className="main">
      <h1 className="title">Fortschritt: Umsatzziel</h1>

      <ProgressBar value={68} />

      <ChartPlaceholder />

      <div className="cards">
        <Card title="Status">🟢 Auf Kurs</Card>
        <Card title="Aktueller Fortschritt">68% – €136.000</Card>
        <Card title="Nächster Meilenstein">75% – noch €14.000</Card>
        <Card title="Streak">🔥 12 Tage stark</Card>
      </div>
    </main>
  );
}

export default function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />

      <ErfolgsProvider>
        <DashboardInhalt />
      </ErfolgsProvider>
    </div>
  );
}