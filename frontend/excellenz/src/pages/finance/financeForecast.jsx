import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "../../styles/pages/finance/financeForecast.css";

export default function FinanceForecast({
  sidebarOpen,
  setSidebarOpen,
  salesOpen,
  setSalesOpen,
  financeOpen,
  setFinanceOpen,
}) {
  const [scenario, setScenario] = useState("expected");

  const forecast = {
    revenue: "12.450 €",
    expenses: "3.860 €",
    profit: "8.590 €",
    growth: "+12%",
  };

  const chartData = [
    { month:"Jan", expenses:4200, best:8500, expected:8500, worst:8500 },
    { month:"Feb", expenses:4300, best:9100, expected:9100, worst:9100 },
    { month:"Mär", expenses:4450, best:9800, expected:9800, worst:9800 },
    { month:"Apr", expenses:4600, best:10800, expected:10800, worst:10800 },
    { month:"Mai", expenses:4700, best:11700, expected:11700, worst:11700 },
    { month:"Jun", expenses:3860, best:12450, expected:12450, worst:12450 },
    { month:"Jul", expenses:3800, best:13600, expected:12800, worst:11300 },
    { month:"Aug", expenses:3700, best:14700, expected:13400, worst:10600 },
    { month:"Sep", expenses:3650, best:15900, expected:14100, worst:9800 },
    { month:"Okt", expenses:3600, best:17100, expected:14700, worst:9200 },
    { month:"Nov", expenses:3500, best:18300, expected:15200, worst:8600 },
    { month:"Dez", expenses:3400, best:19500, expected:15700, worst:8000 },
  ];

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

      <main className="forecastMain">
        <header className="forecastHeader">
          <h1>Finanzprognose</h1>
          <p>Übersicht der erwarteten Geschäftsentwicklung</p>
        </header>

        <div className="forecastChart">
          <Card title="Umsatz- und Kostenentwicklung">

            <div className="scenarioButtons">
              <button className={scenario==="best"?"activeScenario":""}
                onClick={()=>setScenario("best")}>Best Case</button>

              <button className={scenario==="expected"?"activeScenario":""}
                onClick={()=>setScenario("expected")}>Erwartet</button>

              <button className={scenario==="worst"?"activeScenario":""}
                onClick={()=>setScenario("worst")}>Worst Case</button>
            </div>

            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>

                <Line
                  type="monotone"
                  dataKey={scenario}
                  name="Umsatz"
                  stroke="#00ff88"
                  strokeWidth={4}
                />

                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Kosten"
                  stroke="#ff4d4d"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* KPI Cards */}
        {/* KPI Cards */}
<div className="forecastGridWrapper">

    <div className="forecastGrid">

        <Card title="Erwarteter Umsatz">
            <h2>{forecast.revenue}</h2>
            <p>Prognose für den aktuellen Monat.</p>
        </Card>

        <Card title="Erwartete Ausgaben">
            <h2>{forecast.expenses}</h2>
            <p>Geschätzte laufende Kosten.</p>
        </Card>

        <Card title="Prognostizierter Gewinn">
            <h2>{forecast.profit}</h2>
            <p>Umsatz minus Ausgaben.</p>
        </Card>

        <Card title="Wachstum">
            <h2>{forecast.growth}</h2>
            <p>Vergleich zum Vormonat.</p>
        </Card>

    </div>

</div>

{/* Untere Reihe */}
<div className="forecastBottom">

    <Card title="Nächste Ziele">
        <ul>
            <li>15.000 € Umsatz erreichen</li>
            <li>Kosten unter 4.000 € halten</li>
            <li>Gewinn um 10 % steigern</li>
        </ul>
    </Card>

    <Card title="Analyse">
        <p>
            Im Best-Case entwickelt sich der Umsatz deutlich stärker.
            Im Worst-Case fällt das Wachstum ab.
            Die erwartete Prognose basiert auf den bisherigen Verkaufszahlen.
        </p>
    </Card>

</div>
      </main>
    </div>
  );
}