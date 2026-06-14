import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getCapital, refreshAccessToken } from "../../api/funcs";

import {
  FaPlus,
  FaEuroSign,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";

import "../../styles/pages/finance/revenue.css";
import Input from "../../components/inputs";
import { getTransactions } from "../../api/inputs/inputAPI";

export default function Revenue({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}) 
{
  const [capital, setCapital] = useState(0);
  const [revenues, setRevenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadCapital = async () => {
    try {
      const data = await getCapital();
      setCapital(data.capital);
    } catch (err) {
      console.error("Fehler beim Laden des Kapitals:", err);
    }
  };
  
  useEffect(() => {
    loadCapital();
  }, []);

  const fetchTransaction = async () => {
    try {
      setLoading(true);

      const data = await getTransactions();
      setRevenues(data);
      loadCapital();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);


  const totalRevenue = revenues.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="layout">

      <Input onCreated={async () => {
        await fetchTransaction ();
      }} />

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        salesOpen={salesOpen}
        setSalesOpen={setSalesOpen}
        financeOpen={financeOpen}
        setFinanceOpen={setFinanceOpen}
      />

      <main className="revenueMain">

        {/* HEADER */}
        <header className="revenueHeader">
          <div>
            <h1>Umsatzplanung</h1>
            <p>
              Plane deine Einnahmen und analysiere
              Umsatzentwicklungen.
            </p>
          </div>

        </header>

        {/* KPI CARDS */}
        <section className="revenueStats">

          <div className="revenueCard">
            <div className="cardIcon green">
              <FaEuroSign />
            </div>

            <div>
              <span>Gesamtkapital</span>
              <h2>{capital}€</h2>
            </div>
          </div>

          <div className="revenueCard">
            <div className="cardIcon blue">
              <FaChartLine />
            </div>

            <div>
              <span>Monatswachstum</span>
              <h2>+12%</h2>
            </div>
          </div>

          <div className="revenueCard">
            <div className="cardIcon orange">
              <FaBoxOpen />
            </div>

            <div>
              <span>Produkte / Services</span>
              <h2>{revenues.length}</h2>
            </div>
          </div>

        </section>

        {/* CHART PLACEHOLDER */}
        <section className="chartSection">
          <div className="chartPlaceholder">
            Umsatzdiagramm
          </div>
        </section>

        {/* TABLE */}
        <section className="revenueTableWrapper">
          <div className="tableHeader">
            <h3>Transaktionen</h3>
          </div>

          <table className="revenueTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Kategorie</th>
                <th>Preis</th>
                <th>Menge</th>
                <th>Umsatz</th>
              </tr>
            </thead>

            <tbody>
              {revenues.map((item) => (
                <tr
                  key={item.id}
                  className={item.type === "expense" ? "expenseRow" : "incomeRow"}
                >
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}€</td>
                  <td>{item.quantity}</td>

                  <td
                    className={
                      item.type === "expense" ? "highlightExpense" : "highlightIncome"
                    }
                  > 
                   {item.type === "expense" ? " -" : " "}
                   {item.total_revenue ?? item.price * item.quantity}
                   € 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </section>
      </main>
    </div>
  );
}