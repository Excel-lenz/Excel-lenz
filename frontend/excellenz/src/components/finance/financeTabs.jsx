import React, { useState } from "react";
import "../../styles/components/finance/financeTabs.css";

export default function FinanceTabs() {
  const [activeTab, setActiveTab] = useState("liquiditaet");

  return (
    <div className="financeTabsWrapper">
      <div className="financeTabsHeader">
        <button
          className={activeTab === "liquiditaet" ? "active" : ""}
          onClick={() => setActiveTab("liquiditaet")}
        >
          Liquidität
        </button>

        <button
          className={activeTab === "kosten" ? "active" : ""}
          onClick={() => setActiveTab("kosten")}
        >
          Kostenstruktur
        </button>

        <button
          className={activeTab === "breakEven" ? "active" : ""}
          onClick={() => setActiveTab("breakEven")}
        >
          Break-even
        </button>
      </div>

      <div className="financeTabContent">
        {activeTab === "liquiditaet" && (
          <div>
            <h3>Liquiditätsplanung</h3>
            <p>
              Gewinne, Verluste sowie Steuerzahlungen werden
              hier grafisch dargestellt.
            </p>
          </div>
        )}

        {activeTab === "kosten" && (
          <div>
            <h3>Kostenstruktur</h3>
            <p>
              Übersicht über fixe und variable Kosten.
            </p>
          </div>
        )}

        {activeTab === "breakEven" && (
          <div>
            <h3>Break-even-Analyse</h3>
            <p>
              Berechnung des Punktes, an dem keine Verluste
              mehr entstehen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}