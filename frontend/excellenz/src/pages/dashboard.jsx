import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/topbar";
import ProgressBar from "../components/ProgressBar";
import ChartPlaceholder from "../components/ChartPlaceholder";
import Card from "../components/Card";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="layout">
      <Topbar />
      <Sidebar />

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
    </div>
  );
}
