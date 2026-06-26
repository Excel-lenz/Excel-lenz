import React, { useState, useEffect } from "react";
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
import { getForecast } from "../../api/forecast/forecastAPI";



export default function FinanceForecast({
  sidebarOpen,
  setSidebarOpen,
  salesOpen,
  setSalesOpen,
  financeOpen,
  setFinanceOpen,
}) {
  const [scenario, setScenario] = useState("expected");
  const [forecast, setForecast] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [forecastKpis, setForecastKpis] = useState(null);

    useEffect(() => {
        const loadForecast = async () => {
            try {
                const data = await getForecast(scenario);

                console.log("FORECAST RESPONSE:", data);

                setForecast(data);
                const chart = data.chart || [];

                if (chart.length > 0) {
                    const last = chart[chart.length - 1];

                    const revenue = last.income;
                    const expenses = last.expenses;
                    const profit = revenue - expenses;

                    const prev = chart[chart.length - 2] || last;
                    const growth =
                        prev.income !== 0
                            ? ((revenue - prev.income) / prev.income) * 100
                            : 0;

                    setForecastKpis({
                        revenue,
                        expenses,
                        profit,
                        growth,
                    });
                }
                setChartData(data.chart || []);
            } catch (err) {
                console.error("Forecast error:", err);
            }
        };

        loadForecast();
    }, [scenario]);

    if (!forecast) {
        return (
            <div style={{ padding: 40, color: "white" }}>
                Loading forecast...
            </div>
        );
    }



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
                  <XAxis
                      dataKey="month"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                  />
                <YAxis/>
                <Tooltip/>
                <Legend/>

                  <Line
                      type="monotone"
                      dataKey="income"
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
            <h2>{forecastKpis?.revenue.toFixed(2)}</h2>
            <p>Prognose für den aktuellen Monat.</p>
        </Card>

        <Card title="Erwartete Ausgaben">
            <h2>{forecastKpis?.expenses.toFixed(2)}</h2>
            <p>Geschätzte laufende Kosten.</p>
        </Card>

        <Card title="Prognostizierter Gewinn">
            <h2>{forecastKpis?.profit.toFixed(2)}</h2>
            <p>Umsatz minus Ausgaben.</p>
        </Card>

        <Card title="Wachstum">
            <h2>{forecastKpis?.growth.toFixed(2)}%</h2>
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