import React from "react";
import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import ChartPlaceholder from "../components/ChartPlaceholder";
import Card from "../components/Card";
import Streak from "../components/Streak";
import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <h1 className="title">Fortschritt: Umsatzziel</h1>
        <ProgressBar value={68} />
        <ChartPlaceholder />
        <div className="cards">
          <Card title="Status">🟢 Auf Kurs</Card>
          <Card title="Aktueller Fortschritt">68% – €136.000</Card>
          <Card title="Nächster Meilenstein">75% – noch €14.000</Card>
          <Streak></Streak>
        </div>
      </main>
    </div>
  );
}
