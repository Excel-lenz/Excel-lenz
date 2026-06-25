import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "../styles/components/chartplaceholder.css";
import { formatCurrency, normalizeCurrencySettings } from "../utils/currency.jsx";

const monthFormatter = new Intl.DateTimeFormat("de-DE", { month: "short" });

const CHART_MODES = {
  revenue: "revenue",
  liquidity: "liquidity",
  breakeven: "breakeven",
};

const buildMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

const buildMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split("-");
  return `${monthFormatter.format(new Date(Number(year), Number(month) - 1, 1))} ${year}`;
};

export default function ChartPlaceholder({ transactions = [], capital = 0, goal = 0, currencySettings }) {
  const [mode, setMode] = useState(CHART_MODES.revenue);
  const settings = normalizeCurrencySettings(currencySettings);

  const monthlySummary = useMemo(() => {
    const summaryMap = new Map();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.created_at || transaction.date);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const key = buildMonthKey(date);
      const current = summaryMap.get(key) || {
        month: buildMonthLabel(key),
        income: 0,
        expense: 0,
        net: 0,
      };

      const value = Number(transaction.total ?? transaction.price * transaction.quantity ?? 0);

      if (!Number.isFinite(value)) {
        return;
      }

      if (transaction.type === "expense") {
        current.expense += value;
        current.net -= value;
      } else {
        current.income += value;
        current.net += value;
      }

      summaryMap.set(key, current);
    });

    return Array.from(summaryMap.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([, value]) => value);
  }, [transactions]);

  const chartData = useMemo(() => {
    if (mode === CHART_MODES.revenue) {
      return monthlySummary.map((item) => ({
        month: item.month,
        value: item.income,
      }));
    }

    if (mode === CHART_MODES.liquidity) {
      let runningLiquidity = 0;
      return monthlySummary.map((item) => {
        runningLiquidity += item.net;
        return {
          month: item.month,
          value: runningLiquidity,
        };
      });
    }

    const avgNetPerMonth = monthlySummary.length
      ? monthlySummary.reduce((sum, item) => sum + item.net, 0) / monthlySummary.length
      : 0;

    const currentDate = new Date();
    const projectionMonths = 12;

    return Array.from({ length: projectionMonths + 1 }, (_, index) => {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + index, 1);
      const projected = Number(capital) + avgNetPerMonth * index;

      return {
        month: `${monthFormatter.format(monthDate)} ${monthDate.getFullYear()}`,
        projection: projected,
        target: Number(goal || 0),
      };
    });
  }, [mode, monthlySummary, capital, goal]);

  const chartMeta = useMemo(() => {
    if (mode === CHART_MODES.revenue) {
      return {
        title: "Umsatzverlauf",
        subtitle: "Monatlicher Umsatz auf Basis deiner Einnahmen",
        yLabel: "Umsatz",
        xLabel: "Monat",
      };
    }

    if (mode === CHART_MODES.liquidity) {
      return {
        title: "Liquiditaetsverlauf",
        subtitle: "Kumulierte Liquiditaet aus Einnahmen und Ausgaben",
        yLabel: "Liquiditaet",
        xLabel: "Monat",
      };
    }

    return {
      title: "Break-even Projektion",
      subtitle: "Prognose auf Basis des durchschnittlichen monatlichen Netto-Cashflows",
      yLabel: "Kapital",
      xLabel: "Monat",
    };
  }, [mode]);

  const progress = goal > 0 ? Math.max(0, Math.min((capital / goal) * 100, 100)) : 0;

  return (
    <div className="chart-placeholder">
      <div className="chart-placeholder__header">
        <h3 className="chart-placeholder__title">{chartMeta.title}</h3>

        <div className="chart-placeholder__modes" role="tablist" aria-label="Diagrammtyp auswaehlen">
          <button
            type="button"
            className={`chart-placeholder__mode-btn${mode === CHART_MODES.revenue ? " is-active" : ""}`}
            onClick={() => setMode(CHART_MODES.revenue)}
          >
            Umsatz
          </button>
          <button
            type="button"
            className={`chart-placeholder__mode-btn${mode === CHART_MODES.liquidity ? " is-active" : ""}`}
            onClick={() => setMode(CHART_MODES.liquidity)}
          >
            Liquiditaet
          </button>
          <button
            type="button"
            className={`chart-placeholder__mode-btn${mode === CHART_MODES.breakeven ? " is-active" : ""}`}
            onClick={() => setMode(CHART_MODES.breakeven)}
          >
            Break-even
          </button>
        </div>
      </div>

      <div className="chart-placeholder__chart-wrap">
        <ResponsiveContainer width="100%" height="100%" minHeight={220} minWidth={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              label={{ value: chartMeta.xLabel, position: "insideBottom", offset: -8, fill: "#94a3b8" }}
            />
            <YAxis
              stroke="#94a3b8"
              tickFormatter={(value) => formatCurrency(value, settings)}
              width={96}
              label={{ value: chartMeta.yLabel, angle: -90, position: "insideLeft", fill: "#94a3b8" }}
            />
            <Tooltip formatter={(value) => formatCurrency(value, settings)} />

            {mode === CHART_MODES.breakeven ? (
              <>
                <Line type="monotone" dataKey="projection" stroke="#00ff88" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </>
            ) : (
              <Line type="monotone" dataKey="value" stroke="#00ff88" strokeWidth={3} dot={{ r: 4 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
