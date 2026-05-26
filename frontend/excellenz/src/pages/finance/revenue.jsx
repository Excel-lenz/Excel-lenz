import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import {
  FaPlus,
  FaEuroSign,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";

import "../../styles/pages/finance/revenue.css";

export default function Revenue({sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen}) 
{
  const [revenues, setRevenues] = useState([
    {
      id: 1,
      name: "Webdesign Projekt",
      category: "Dienstleistung",
      price: 1500,
      quantity: 3,
    },
    {
      id: 2,
      name: "SEO Betreuung",
      category: "Abo",
      price: 500,
      quantity: 5,
    },
  ]);

  const totalRevenue = revenues.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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

        {/* HEADER */}
        <header className="revenueHeader">
          <div>
            <h1>Umsatzplanung</h1>
            <p>
              Plane deine Einnahmen und analysiere
              Umsatzentwicklungen.
            </p>
          </div>

          <button className="addRevenueBtn">
            <FaPlus />
            Neue Einnahme
          </button>
        </header>

        {/* KPI CARDS */}
        <section className="revenueStats">

          <div className="revenueCard">
            <div className="cardIcon green">
              <FaEuroSign />
            </div>

            <div>
              <span>Gesamtumsatz</span>
              <h2>€ {totalRevenue.toLocaleString()}</h2>
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
            <h3>Einnahmen</h3>

            <button className="tableAddBtn">
              <FaPlus />
              Hinzufügen
            </button>
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
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>€ {item.price}</td>
                  <td>{item.quantity}</td>
                  <td className="highlight">
                    € {item.price * item.quantity}
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