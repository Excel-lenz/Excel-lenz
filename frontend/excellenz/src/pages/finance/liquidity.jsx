import Sidebar from "../../components/sidebar.jsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import ReactDatePicker from "react-datepicker";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";

import "../../styles/pages/finance/liquidity.css";
import { getTransactions } from "../../api/inputs/inputAPI.jsx";
import { getCostItems } from "../../api/finance/costs.jsx";
import { getLiquiditySummary } from "../../api/finance/liquidity.jsx";
import { getCapital } from "../../api/funcs.jsx";
import { formatCurrency } from "../../utils/currency.jsx";
import { useCurrencySettings } from "../../context/currencySettingsContext.jsx";

const toIsoDate = (date) => {
  if (!(date instanceof Date)) return "";
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - timezoneOffset).toISOString().split("T")[0];
};

const monthKey = (isoDate) => String(isoDate || "").slice(0, 7);

const parseIsoDate = (value) => {
  if (!value) return null;
  if (typeof value === "string") {
    const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
      const year = Number(dateOnlyMatch[1]);
      const month = Number(dateOnlyMatch[2]);
      const day = Number(dateOnlyMatch[3]);
      const localDate = new Date(year, month - 1, day);
      if (
        localDate.getFullYear() === year &&
        localDate.getMonth() === month - 1 &&
        localDate.getDate() === day
      ) {
        return localDate;
      }
      return null;
    }
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const listMonthsInclusive = (startIso, endIso) => {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);

  if (!start || !end || start > end) return [];

  const months = [];
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMarker = new Date(end.getFullYear(), end.getMonth(), 1);

  while (cursor <= endMarker) {
    months.push(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  return months;
};

const formatDate = (dateString) => {
  const date = parseIsoDate(dateString);
  return date ? date.toLocaleDateString("de-DE") : "-";
};

const monthLabel = (month) => {
  if (!month) return "-";
  const [year, mm] = month.split("-");
  return `${mm}.${year}`;
};

const startOfMonthIso = (date) => toIsoDate(new Date(date.getFullYear(), date.getMonth(), 1));

const endOfMonthIso = (date) => toIsoDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));

const addDaysIso = (isoDate, days) => {
  const base = parseIsoDate(isoDate);
  if (!base) return isoDate;
  return toIsoDate(new Date(base.getTime() + days * 24 * 60 * 60 * 1000));
};

const addMonthsIso = (isoDate, months) => {
  const base = parseIsoDate(isoDate);
  if (!base) return isoDate;
  return toIsoDate(new Date(base.getFullYear(), base.getMonth() + months, base.getDate()));
};

function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="customSelect" ref={ref}>
      <button type="button" className="customSelectBtn" onClick={() => setOpen((o) => !o)}>
        <span>{selected?.label}</span>
        <span className={`customSelectArrow ${open ? "open" : ""}`}>▾</span>
      </button>
      {open && (
        <ul className="customSelectMenu">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`customSelectOption${opt.value === value ? " active" : ""}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LiquidDatePicker({ typeDate, setTypeDate, minDate, maxDate }) {
  return (
    <ReactDatePicker
      selected={parseIsoDate(typeDate)}
      onChange={(date) => setTypeDate(date ? toIsoDate(date) : "")}
      dateFormat="dd.MM.yyyy"
      popperPlacement="bottom-start"
      className="tableDateInput"
      minDate={minDate || undefined}
      maxDate={maxDate || undefined}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
}

export default function Liquidity({
  sidebarOpen,
  setSidebarOpen,
  salesOpen,
  setSalesOpen,
  financeOpen,
  setFinanceOpen,
}) {
  const todayIso = toIsoDate(new Date());
  const initialStart = toIsoDate(new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1));
  const initialEnd = toIsoDate(new Date(new Date().getFullYear(), new Date().getMonth() + 6, 0));

  const [transactions, setTransactions] = useState([]);
  const [costItems, setCostItems] = useState([]);
  const [capital, setCapital] = useState(0);
  const { currencySettings } = useCurrencySettings();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [summaryData, setSummaryData] = useState(null);

  const loadLiquidityData = async () => {
    try {
      setLoading(true);
      setError("");

      const [transactionData, costData, capitalData] = await Promise.all([
        getTransactions(),
        getCostItems(),
        getCapital(),
      ]);

      setTransactions(Array.isArray(transactionData) ? transactionData : []);
      setCostItems(Array.isArray(costData) ? costData : []);
      setCapital(Number(capitalData?.capital || 0));
    } catch (err) {
      console.error("Failed to load liquidity data:", err);
      setError("Liquiditätsdaten konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiquidityData();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadSummary = async () => {
      try {
        const summary = await getLiquiditySummary({
          startDate,
          endDate,
          category: activeCategory,
          type: activeType,
        });

        if (!cancelled) {
          setSummaryData(summary);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load liquidity summary:", err);
          setSummaryData(null);
        }
      }
    };

    loadSummary();

    return () => {
      cancelled = true;
    };
  }, [startDate, endDate, activeCategory, activeType]);

  const recurringExpensePerMonth = useMemo(() => {
    return costItems.reduce((sum, item) => {
      const amount = Number(item?.amount || 0);
      if (!Number.isFinite(amount)) return sum;
      if (item?.period === "yearly") return sum + amount / 12;
      return sum + amount;
    }, 0);
  }, [costItems]);

  const normalizedTransactions = useMemo(() => {
    return transactions
      .map((item) => {
        const isIncome = item?.type === "income";
        const amount = Number(item?.total ?? Number(item?.price || 0) * Number(item?.quantity || 0));
        const transactionDate = item?.date || item?.created_at;
        const dateIso = toIsoDate(new Date(transactionDate));

        if (!dateIso || !Number.isFinite(amount)) return null;

        return {
          id: `tx-${item.id}`,
          name: item?.name || "Transaktion",
          category: isIncome ? "Einnahme" : "Ausgabe",
          typ: "Einmalig",
          datum: dateIso,
          price: isIncome ? amount : -amount,
          sortDate: dateIso,
        };
      })
      .filter(Boolean);
  }, [transactions]);

  const normalizedCostItems = useMemo(() => {
    return costItems
      .map((item) => {
        const dateIso = toIsoDate(new Date(item?.created_at));
        const amount = Number(item?.amount || 0);
        if (!dateIso || !Number.isFinite(amount)) return null;

        return {
          id: `cost-${item.id}`,
          name: item?.name || "Kostenposition",
          category: "Ausgabe",
          typ: item?.period === "yearly" ? "Jaehrlich" : "Monatlich",
          datum: dateIso,
          price: -amount,
          sortDate: dateIso,
        };
      })
      .filter(Boolean);
  }, [costItems]);

  const dataDateBounds = useMemo(() => {
    const allDates = [
      ...normalizedTransactions.map((item) => item.datum),
      ...normalizedCostItems.map((item) => item.datum),
    ].filter(Boolean);

    if (allDates.length === 0) {
      return { min: initialStart, max: initialEnd };
    }

    const sorted = [...allDates].sort((a, b) => String(a).localeCompare(String(b)));
    return { min: sorted[0], max: sorted[sorted.length - 1] };
  }, [normalizedTransactions, normalizedCostItems, initialStart, initialEnd]);

  const startPickerMaxDate = useMemo(() => parseIsoDate(endDate), [endDate]);
  const endPickerMinDate = useMemo(() => parseIsoDate(startDate), [startDate]);

  const handleStartDateChange = (nextStart) => {
    setStartDate(nextStart);
    if (nextStart > endDate) {
      setEndDate(nextStart);
    }
  };

  const handleEndDateChange = (nextEnd) => {
    setEndDate(nextEnd);
    if (nextEnd < startDate) {
      setStartDate(nextEnd);
    }
  };

  const applyDatePreset = (preset) => {
    const today = todayIso;

    if (preset === "30d") {
      setStartDate(addDaysIso(today, -29));
      setEndDate(today);
      return;
    }

    if (preset === "90d") {
      setStartDate(addDaysIso(today, -89));
      setEndDate(today);
      return;
    }

    if (preset === "180d") {
      setStartDate(addDaysIso(today, -179));
      setEndDate(today);
      return;
    }

    if (preset === "ytd") {
      const now = parseIsoDate(today);
      if (!now) return;
      setStartDate(toIsoDate(new Date(now.getFullYear(), 0, 1)));
      setEndDate(today);
      return;
    }

    if (preset === "12m") {
      setStartDate(startOfMonthIso(parseIsoDate(addMonthsIso(today, -11)) || new Date()));
      setEndDate(endOfMonthIso(parseIsoDate(today) || new Date()));
      return;
    }

    if (preset === "all") {
      setStartDate(dataDateBounds.min || initialStart);
      setEndDate(dataDateBounds.max || initialEnd);
    }
  };

  const allEntries = useMemo(() => {
    return [...normalizedTransactions, ...normalizedCostItems].sort((a, b) => {
      if (a.typ === "Monatlich" && b.typ !== "Monatlich") return -1;
      if (a.typ !== "Monatlich" && b.typ === "Monatlich") return 1;
      return String(a.sortDate).localeCompare(String(b.sortDate));
    });
  }, [normalizedTransactions, normalizedCostItems]);

  const monthList = useMemo(() => listMonthsInclusive(startDate, endDate), [startDate, endDate]);

  const monthlyData = useMemo(() => {
    const base = monthList.map((month) => ({
      month,
      label: monthLabel(month),
      income: 0,
      expense: recurringExpensePerMonth,
      recurringExpense: recurringExpensePerMonth,
      oneTimeExpense: 0,
      net: 0,
      liquidity: 0,
    }));

    const monthIndex = new Map(base.map((row, idx) => [row.month, idx]));

    normalizedTransactions.forEach((tx) => {
      const key = monthKey(tx.datum);
      const idx = monthIndex.get(key);
      if (idx === undefined) return;

      if (tx.category === "Einnahme") {
        base[idx].income += tx.price;
      } else {
        const absoluteExpense = Math.abs(tx.price);
        base[idx].expense += absoluteExpense;
        base[idx].oneTimeExpense += absoluteExpense;
      }
    });

    let runningLiquidity = capital;
    base.forEach((row) => {
      row.net = row.income - row.expense;
      runningLiquidity += row.net;
      row.liquidity = runningLiquidity;
    });

    return base;
  }, [monthList, recurringExpensePerMonth, normalizedTransactions, capital]);

  const dateFilteredEntries = useMemo(() => {
    return allEntries.filter((item) => {
      if (item.typ === "Monatlich" || item.typ === "Jaehrlich") return true;
      return item.datum >= startDate && item.datum <= endDate;
    });
  }, [allEntries, startDate, endDate]);

  const settingsFilteredList = useMemo(() => {
    return dateFilteredEntries.filter((item) => {
      const categoryOk = activeCategory === "All" || item.category === activeCategory;
      const typeOk = activeType === "All" || item.typ === activeType;
      return categoryOk && typeOk;
    });
  }, [dateFilteredEntries, activeCategory, activeType]);

  const allEinzahlungen = useMemo(() => monthlyData.reduce((sum, row) => sum + row.income, 0), [monthlyData]);
  const allAuszahlungen = useMemo(() => monthlyData.reduce((sum, row) => sum + row.expense, 0), [monthlyData]);
  const allFilteredEinzahlungen = useMemo(() => {
    const backendValue = Number(summaryData?.filtered?.income);
    if (Number.isFinite(backendValue)) return backendValue;
    return settingsFilteredList.filter((x) => x.category === "Einnahme").reduce((sum, x) => sum + x.price, 0);
  }, [summaryData, settingsFilteredList]);
  const allFilteredAuszahlungen = useMemo(() => {
    const backendValue = Number(summaryData?.filtered?.expense);
    if (Number.isFinite(backendValue)) return backendValue;
    return settingsFilteredList
      .filter((x) => x.category === "Ausgabe")
      .reduce((sum, x) => sum + Math.abs(x.price), 0);
  }, [summaryData, settingsFilteredList]);

  const monthCount = monthList.length || 1;
  const cashFlow = (allEinzahlungen - allAuszahlungen) / monthCount;
  const endbestand = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1].liquidity : capital;

  const liabilitiesEstimate = Math.max(allAuszahlungen / monthCount, 1);
  const liquiGrad1 = (capital / liabilitiesEstimate) * 100;

  const operationalCashflow = useMemo(() => {
    return normalizedTransactions.reduce((sum, tx) => sum + tx.price, 0) - recurringExpensePerMonth * monthCount;
  }, [normalizedTransactions, recurringExpensePerMonth, monthCount]);

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

      <main className="revenueMain">
        <header className="revenueHeader">
          <div>
            <h1>Liquidität</h1>
            <p>Analyse von Ein- und Auszahlungen auf Basis deiner Daten</p>
          </div>

          <button className="addRevenueBtn" onClick={loadLiquidityData} type="button">
            <FaArrowsRotate />
            Daten aktualisieren
          </button>
        </header>

        {error && (
          <section className="revenueStats">
            <div className="revenueCard2">
              <div>
                <span>Fehler</span>
                <h2>{error}</h2>
              </div>
            </div>
          </section>
        )}

        {loading && (
          <section className="revenueStats">
            <div className="revenueCard2">
              <div>
                <span>Status</span>
                <h2>Daten werden geladen...</h2>
              </div>
            </div>
          </section>
        )}

        {!loading && (
          <>
            {/* KPI CARDS */}
            <section className="revenueStats">
              <div className="revenueCard">
                <div>
                  <span>Aktuelle Liquidität</span>
                  <h2>{formatCurrency(capital, currencySettings)}</h2>
                </div>
              </div>
              <div className="revenueCard">
                <div>
                  <span>Periodenende {formatDate(endDate)}</span>
                  <h2>{formatCurrency(endbestand, currencySettings)}</h2>
                </div>
              </div>
              <div className="revenueCard">
                <div>
                  <span>Ø Cashflow / Monat</span>
                  <h2>{formatCurrency(cashFlow, currencySettings)}</h2>
                </div>
              </div>
              <div className="revenueCard">
                <div>
                  <span>Liquiditätsgrad 1</span>
                  <h2>{liquiGrad1.toFixed(1)}%</h2>
                </div>
              </div>
              <div className="revenueCard">
                <div>
                  <span>alle gefilterten Einnahmen von {formatDate(startDate)} bis {formatDate(endDate)}</span>
                  <h2>{formatCurrency(allFilteredEinzahlungen, currencySettings)}</h2>
                </div>
              </div>
              <div className="revenueCard">
                <div>
                  <span>alle gefilterten Ausgaben von {formatDate(startDate)} bis {formatDate(endDate)}</span>
                  <h2>{formatCurrency(-allFilteredAuszahlungen, currencySettings)}</h2>
                </div>
              </div>
            </section>

            {/* CHARTS */}
            <section className="chartSection">
              <div className="chartPlaceholder liquidityChartWrap">
                <div className="liquidityChartBox">
                  <h3>Ein- und Auszahlungen pro Monat</h3>
                  <ResponsiveContainer width="100%" height={260} minWidth={280} minHeight={220}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                      <XAxis dataKey="label" stroke="#6b7280" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#6b7280" width={90} tick={{ fontSize: 11 }} tickFormatter={(v) => formatCurrency(v, currencySettings)} />
                      <Tooltip formatter={(v) => formatCurrency(v, currencySettings)} contentStyle={{ background: "#111", border: "1px solid #333" }} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#00ff88" strokeWidth={2} name="Einnahmen" dot={false} />
                      <Line type="monotone" dataKey="expense" stroke="#ff4d6d" strokeWidth={2} name="Ausgaben" dot={false} />
                      <Line type="monotone" dataKey="net" stroke="#60a5fa" strokeWidth={2} name="Netto" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="liquidityChartBox">
                  <h3>Kumulierte Liquidität</h3>
                  <ResponsiveContainer width="100%" height={260} minWidth={280} minHeight={220}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                      <XAxis dataKey="label" stroke="#6b7280" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#6b7280" width={90} tick={{ fontSize: 11 }} tickFormatter={(v) => formatCurrency(v, currencySettings)} />
                      <Tooltip formatter={(v) => formatCurrency(v, currencySettings)} contentStyle={{ background: "#111", border: "1px solid #333" }} />
                      <Legend />
                      <Line type="monotone" dataKey="liquidity" stroke="#fbbf24" strokeWidth={3} name="Liquiditätsverlauf" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* TABLE */}
            <section className="revenueTableWrapper">
              {/* Toolbar: eine einzige Zeile mit allem */}
              <div className="liq-toolbar">
                <div className="liq-toolbar-dates">
                  <div className="tableDateField">
                    <label>Von</label>
                    <LiquidDatePicker typeDate={startDate} setTypeDate={handleStartDateChange} maxDate={startPickerMaxDate} />
                  </div>
                  <div className="tableDateField">
                    <label>Bis</label>
                    <LiquidDatePicker typeDate={endDate} setTypeDate={handleEndDateChange} minDate={endPickerMinDate} />
                  </div>
                </div>

                <div className="liq-toolbar-presets">
                  {[["30d","30T"], ["90d","90T"], ["12m","12M"], ["all","Alle"]].map(([preset, label]) => (
                    <button key={preset} className="liq-preset-btn" onClick={() => applyDatePreset(preset)} type="button">{label}</button>
                  ))}
                </div>

                <div className="liq-toolbar-filters">
                  <CustomSelect
                    value={activeCategory}
                    onChange={setActiveCategory}
                    options={[
                      { value: "All", label: "Alle Kategorien" },
                      { value: "Einnahme", label: "Einnahmen" },
                      { value: "Ausgabe", label: "Ausgaben" },
                    ]}
                  />
                  <CustomSelect
                    value={activeType}
                    onChange={setActiveType}
                    options={[
                      { value: "All", label: "Alle Typen" },
                      { value: "Monatlich", label: "Monatlich" },
                      { value: "Jaehrlich", label: "Jährlich" },
                      { value: "Einmalig", label: "Einmalig" },
                    ]}
                  />
                  <button className="liq-reset-btn" type="button" onClick={() => { setActiveCategory("All"); setActiveType("All"); setStartDate(initialStart); setEndDate(initialEnd); }}>
                    Zurücksetzen
                  </button>
                  <span className="tableMetaPill">{settingsFilteredList.length} Einträge</span>
                </div>
              </div>

              <table className="revenueTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Kategorie</th>
                    <th>Typ</th>
                    <th>Datum</th>
                    <th>Betrag</th>
                  </tr>
                </thead>

                <tbody>
                  {settingsFilteredList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="tableEmptyState">
                        Keine Einträge für die aktuelle Filterkombination gefunden.
                      </td>
                    </tr>
                  ) : (
                    settingsFilteredList.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.typ}</td>
                        <td>{formatDate(item.datum)}</td>
                        <td className={item.price < 0 ? "negative" : "positive"}>
                          {formatCurrency(item.price, currencySettings)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
