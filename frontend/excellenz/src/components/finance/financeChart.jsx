
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "../../styles/components/finance/financeChart.css";

const data = [
  { month: "Jan", liquid: 12000, costs: 9000 },
  { month: "Feb", liquid: 18000, costs: 11000 },
  { month: "Mär", liquid: 22000, costs: 13000 },
  { month: "Apr", liquid: 26000, costs: 15000 },
  { month: "Mai", liquid: 31000, costs: 18000 },
  { month: "Jun", liquid: 37000, costs: 21000 },
  { month: "Jul", liquid: 32000, costs: 12000 },
  { month: "Aug", liquid: 41000, costs: 14000 },
  { month: "Sep", liquid: 40000, costs: 12000 },
  { month: "Okt", liquid: 43000, costs: 21000 },
  { month: "Nov", liquid: 30000, costs: 40000 },
  { month: "Dez", liquid: 34000, costs: 30000 },
];

export default function FinanceChart() {
  return (
    <div className="financeChartCard">

      <div className="financeChartHeader">
        <div>
          <h3>Liquiditätsverlauf</h3>
          <p>Nächste 12 Monate</p>
        </div>

        <select>
          <option>Jährlich</option>
          <option>Monatlich</option>
        </select>
      </div>

      <div className="chartContainer">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            
            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              vertical={true}
            />

            <XAxis
              dataKey="month"
              stroke="#9ca3af"
            />

            <YAxis
              stroke="#9ca3af"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="liquid"
              stroke="#00ff88"
              strokeWidth={3}
              dot={{
                r: 6,
                strokeWidth: 2,
                fill: "#00ff88",
              }}
            />

            <Line
              type="monotone"
              dataKey="costs"
              stroke="#ff4d6d"
              strokeWidth={3}
              dot={{
                r: 6,
                strokeWidth: 2,
                fill: "#ff4d6d",
              }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}