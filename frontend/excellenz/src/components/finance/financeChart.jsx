
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
import { formatCurrency, normalizeCurrencySettings } from "../../utils/currency";

const monthFormatter = new Intl.DateTimeFormat("de-DE", { month: "short" });

export default function FinanceChart({ transactions = [], currencySettings }) {
  const settings = normalizeCurrencySettings(currencySettings);
  const groupedByMonth = new Map();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.created_at);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const current = groupedByMonth.get(key) || {
      month: `${monthFormatter.format(date)} ${date.getFullYear()}`,
      liquid: 0,
      costs: 0,
    };

    const amount = Number(transaction.total ?? transaction.price * transaction.quantity);

    if (transaction.type === "expense") {
      current.costs += amount;
      current.liquid -= amount;
    } else {
      current.liquid += amount;
    }

    groupedByMonth.set(key, current);
  });

  const data = Array.from(groupedByMonth.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, value]) => value);

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
        <ResponsiveContainer width="100%" height={320} minWidth={280} minHeight={240}>
          <LineChart data={data}>
            
            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              vertical={true}
            />

            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              label={{ value: "Zeitraum (Monat)", position: "insideBottom", offset: -8, fill: "#9ca3af" }}
            />

            <YAxis
              stroke="#9ca3af"
              tickFormatter={(value) => formatCurrency(value, settings)}
              width={96}
              label={{ value: "Betrag", angle: -90, position: "insideLeft", fill: "#9ca3af" }}
            />

            <Tooltip formatter={(value) => formatCurrency(value, settings)} />

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