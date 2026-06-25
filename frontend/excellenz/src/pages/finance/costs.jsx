import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

import {
  FaPlus,
  FaEuroSign,
  FaChartLine,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import "../../styles/pages/finance/costs.css";
import { getCostItems, createCostItem, deleteCostItem, updateCostItem } from "../../api/finance/costs";
import { getCurrencySymbol } from "../../utils/currency.jsx";
import { useCurrencySettings } from "../../context/currencySettingsContext.jsx";

// Currency conversion rates (base EUR)
const EXCHANGE_RATES = {
  EUR: 1,
  USD: 1.10,
  GBP: 0.86,
  CHF: 0.95,
  JPY: 150,
};

const MAX_COST_EUR = 99999999.99;

// Convert from company currency to EUR (base)
const convertToEUR = (amount, fromCurrency) => {
  if (!EXCHANGE_RATES[fromCurrency]) return amount;
  return amount / EXCHANGE_RATES[fromCurrency];
};

// Convert from EUR (base) to any currency
const convertFromEUR = (amount, toCurrency) => {
  if (!EXCHANGE_RATES[toCurrency]) return amount;
  return amount * EXCHANGE_RATES[toCurrency];
};

// Accept both German and English decimal input and normalize to Number.
const normalizeAmountInput = (value) => {
  if (value === null || value === undefined) return NaN;

  const raw = String(value).trim();
  if (!raw) return NaN;

  // Remove spaces and common currency symbols.
  const cleaned = raw.replace(/[\s€$£¥CHF]/gi, "");

  // Handle formats like 1.234,56 (de) and 1,234.56 (en).
  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");

  let normalized = cleaned;
  if (hasComma && hasDot) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      normalized = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = cleaned.replace(/,/g, "");
    }
  } else if (hasComma) {
    normalized = cleaned.replace(",", ".");
  }

  return Number(normalized);
};

const toBackendAmount = (amount) => Number(amount).toFixed(2);

export default function Costs({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}) 
{
  const { currencySettings } = useCurrencySettings();
  const currency = currencySettings.currency;
  const currencySymbol = getCurrencySymbol(currencySettings);

  const [typ, setTyp] = useState("monthly");
  const [costItems, setCostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCostForm, setShowCostForm] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  // Form state for adding new costs
  const [newCost, setNewCost] = useState({
    name: "",
    amount: "",
    cost_type: "fixed",
    period: "monthly"
  });

  const [editingId, setEditingId] = useState(null);
  const [editingCost, setEditingCost] = useState({});

  // Mouse tracking for form visibility
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Fetch cost items on component mount
  useEffect(() => {
    fetchCosts();
  }, []);

  const fetchCosts = async () => {
    try {
      setLoading(true);
      const data = await getCostItems();
      setCostItems(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching costs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCost = async (e) => {
    e.preventDefault();
    if (!newCost.name || !newCost.amount) {
      setError("Name and amount are required");
      return;
    }

    try {
      const parsedInputAmount = normalizeAmountInput(newCost.amount);

      if (!Number.isFinite(parsedInputAmount) || parsedInputAmount <= 0) {
        setError("Bitte einen gültigen Betrag größer als 0 eingeben");
        return;
      }

      // Convert input amount to EUR for storage
      const amountInEUR = convertToEUR(parsedInputAmount, currency);

      if (!Number.isFinite(amountInEUR) || amountInEUR > MAX_COST_EUR) {
        setError("Betrag ist zu groß. Maximaler Wert: 99.999.999,99 EUR");
        return;
      }
      
      await createCostItem({
        ...newCost,
        amount: toBackendAmount(amountInEUR)
      });
      setNewCost({ name: "", amount: "", cost_type: "fixed", period: "monthly" });
      await fetchCosts();
      setError(null);
      setShowCostForm(false);
    } catch (err) {
      console.error("Error adding cost:", err);
      setError(err.message);
    }
  };

  const handleDeleteCost = async (id) => {
    try {
      await deleteCostItem(id);
      await fetchCosts();
    } catch (err) {
      console.error("Error deleting cost:", err);
      setError(err.message);
    }
  };

  const handleEditCost = (cost) => {
    setEditingId(cost.id);
    // Convert from EUR to display currency
    const amountInCurrency = convertFromEUR(parseFloat(cost.amount), currency);
    setEditingCost({ ...cost, amount: amountInCurrency });
  };

  const handleUpdateCost = async (e) => {
    e.preventDefault();
    try {
      const parsedInputAmount = normalizeAmountInput(editingCost.amount);

      if (!Number.isFinite(parsedInputAmount) || parsedInputAmount <= 0) {
        setError("Bitte einen gültigen Betrag größer als 0 eingeben");
        return;
      }

      // Convert input amount back to EUR for storage
      const amountInEUR = convertToEUR(parsedInputAmount, currency);

      if (!Number.isFinite(amountInEUR) || amountInEUR > MAX_COST_EUR) {
        setError("Betrag ist zu groß. Maximaler Wert: 99.999.999,99 EUR");
        return;
      }
      
      await updateCostItem(editingId, {
        name: editingCost.name,
        amount: toBackendAmount(amountInEUR),
        cost_type: editingCost.cost_type,
        period: editingCost.period
      });
      setEditingId(null);
      await fetchCosts();
    } catch (err) {
      console.error("Error updating cost:", err);
      setError(err.message);
    }
  };

  // Calculate totals with currency conversion
  const fixedCosts = costItems.filter(c => c.cost_type === "fixed");
  const variableCosts = costItems.filter(c => c.cost_type === "variable");

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      // Convert from EUR storage to display currency
      const amountInCurrency = convertFromEUR(parseFloat(item.amount), currency);
      const monthlyAmount = item.period === "yearly" ? amountInCurrency / 12 : amountInCurrency;
      return sum + (typ === "monthly" ? monthlyAmount : monthlyAmount * 12);
    }, 0);
  };

  const fixkostenGesamt = calculateTotal(fixedCosts);
  const variableKostenGesamt = calculateTotal(variableCosts);
  const gesamtkosten = fixkostenGesamt + variableKostenGesamt;

  // Display cost amount with currency conversion
  const displayCostAmount = (amountInEUR) => {
    const amountInCurrency = convertFromEUR(parseFloat(amountInEUR), currency);
    return amountInCurrency.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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

      <main className="costsMain">

        <header className="costsHeader">
          <div>
            <h1>Kostenplanung</h1>  
          </div>
        </header>

        {error && <div className="error-message">{error}</div>}

        <div className="kostenplanung">
          <header className="header">
            <div className="toggle">
              <button className={`tab ${typ === "monthly" ? "active" : ""}`} 
              onClick={() => setTyp("monthly")}>Monatlich</button>

              <button className={`tab ${typ === "yearly" ? "active" : ""}`}
              onClick={() => setTyp("yearly")}>Jährlich</button>
            </div>
          </header>

          {/* Fixed Costs Section */}
          <div className="costsSection">
            <h2>Fixkosten</h2>
            <p className="sectionDesc">Kosten, die unabhängig vom Umsatz anfallen (Miete, Gehälter, Versicherungen)</p>
            
            <div className="costsList">
              {loading ? (
                <p>Lädt...</p>
              ) : fixedCosts.length === 0 ? (
                <p className="emptyMessage">Keine Fixkosten hinzugefügt</p>
              ) : (
                fixedCosts.map(cost => (
                  <div key={cost.id} className="costItem">
                    <div className="costInfo">
                      <span className="costName">{cost.name}</span>
                      <span className="costPeriod">({cost.period === "monthly" ? "monatlich" : "jährlich"})</span>
                    </div>
                    <div className="costAmount">{displayCostAmount(cost.amount)} {currencySymbol}</div>
                    <div className="costActions">
                      <button onClick={() => handleEditCost(cost)} className="editBtn" title="Bearbeiten">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteCost(cost.id)} className="deleteBtn" title="Löschen">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Variable Costs Section */}
          <div className="costsSection">
            <h2>Variable Kosten</h2>
            <p className="sectionDesc">Kosten, die mit dem Umsatz wachsen (Produktion, Versand, Rohstoffe)</p>
            
            <div className="costsList">
              {loading ? (
                <p>Lädt...</p>
              ) : variableCosts.length === 0 ? (
                <p className="emptyMessage">Keine Variable Kosten hinzugefügt</p>
              ) : (
                variableCosts.map(cost => (
                  <div key={cost.id} className="costItem">
                    <div className="costInfo">
                      <span className="costName">{cost.name}</span>
                      <span className="costPeriod">({cost.period === "monthly" ? "monatlich" : "jährlich"})</span>
                    </div>
                    <div className="costAmount">{displayCostAmount(cost.amount)} {currencySymbol}</div>
                    <div className="costActions">
                      <button onClick={() => handleEditCost(cost)} className="editBtn" title="Bearbeiten">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteCost(cost.id)} className="deleteBtn" title="Löschen">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Results Section */}
          <section className="cardsAusgaben">
            <div className="costsCard resultCard">
              <span>Fixkosten ({typ === "monthly" ? "Monat" : "Jahr"})</span>
              <h2>{fixkostenGesamt.toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2})} {currencySymbol}</h2>
            </div>

            <div className="costsCard resultCard">
              <span>Variable Kosten ({typ === "monthly" ? "Monat" : "Jahr"})</span>
              <h2>{variableKostenGesamt.toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2})} {currencySymbol}</h2>
            </div>

            <div className="costsCard resultCard">
              <span>Gesamtkosten ({typ === "monthly" ? "Monat" : "Jahr"})</span>
              <h2>{gesamtkosten.toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2})} {currencySymbol}</h2>
            </div>
          </section>

        </div>

      </main>

      {/* Cost Input Button - Float like Input Component */}
      {!showCostForm && (
        <div className="costFormButtonContainer">
          <button
            className="costFormButton"
            onClick={() => setShowCostForm(true)}>
            + Kostenplanung
          </button>
        </div>
      )}

      {/* Cost Input Form - Like inputs.jsx */}
      {showCostForm && (
        <div className="costFormMenu">
          <div className="formMenuHeader">
            <h3>Neue Kostenstelle</h3>
            <button
              className="closeFormButton"
              onClick={() => setShowCostForm(false)}
            >
              ×
            </button>
          </div>

          <label>Name</label>
          <input
            type="text"
            placeholder="z.B. Miete, Materialkosten"
            value={newCost.name}
            onChange={(e) => setNewCost({...newCost, name: e.target.value})}
          />

          <label>Betrag ({currencySymbol})</label>
          <input 
            type="number" 
            step="0.01"
            placeholder="0.00"
            value={newCost.amount}
            onChange={(e) => setNewCost({...newCost, amount: e.target.value})}
          />

          <label>Kostentyp</label>
          <select value={newCost.cost_type} onChange={(e) => setNewCost({...newCost, cost_type: e.target.value})}>
            <option value="fixed">Fixkosten</option>
            <option value="variable">Variable Kosten</option>
          </select>

          <label>Zeitraum</label>
          <select value={newCost.period} onChange={(e) => setNewCost({...newCost, period: e.target.value})}>
            <option value="monthly">Monatlich</option>
            <option value="yearly">Jährlich</option>
          </select>

          <button
            className="confirmCostButton"
            onClick={handleAddCost}
          >
            Hinzufügen
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="modal-overlay" onClick={() => setEditingId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Kostenstelle bearbeiten</h2>
            <form onSubmit={handleUpdateCost}>
              <div className="inputGroup">
                <label>Name</label>
                <input 
                  type="text" 
                  value={editingCost.name} 
                  onChange={(e) => setEditingCost({...editingCost, name: e.target.value})}
                />
              </div>

              <div className="inputGroup">
                <label>Betrag ({currencySymbol})</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={editingCost.amount} 
                  onChange={(e) => setEditingCost({...editingCost, amount: e.target.value})}
                />
              </div>

              <div className="inputGroup">
                <label>Kostentyp</label>
                <select value={editingCost.cost_type} onChange={(e) => setEditingCost({...editingCost, cost_type: e.target.value})}>
                  <option value="fixed">Fixkosten</option>
                  <option value="variable">Variable Kosten</option>
                </select>
              </div>

              <div className="inputGroup">
                <label>Zeitraum</label>
                <select value={editingCost.period} onChange={(e) => setEditingCost({...editingCost, period: e.target.value})}>
                  <option value="monthly">Monatlich</option>
                  <option value="yearly">Jährlich</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button type="submit" className="saveBtn">Speichern</button>
                <button type="button" onClick={() => setEditingId(null)} className="cancelBtn">Abbrechen</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

}