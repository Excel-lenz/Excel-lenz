import React from "react";
import Sidebar from "../components/Sidebar";

import FinanceInputCard from "../components/finance/financeInputCard";
import FinanceOverviewCard from "../components/finance/financeOverviewCard";
import FinanceProgress from "../components/finance/financeProgress";
import FinanceTabs from "../components/finance/financeTabs";
import FinanceChart from "../components/finance/financeChart";
import RecentEntries from "../components/finance/recentEntries"; 

import "../styles/pages/finance.css";

export default function Finance({ sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen }) {
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

      <main className="financeMain">
        <header className="financeHeader">
          <div>
            <h1 className="financeTitle">Finanzplanung</h1>
            <p className="financeSubtitle">
              Businessplanung & Finanzanalyse für kleine Unternehmen
            </p>
          </div>

          <div className="financeBadge">
            Unternehmensstatus aktiv
          </div>
        </header>

        {/*  -> We could add this, but I think its better to have an fixed small popup on the right or left corner of the screen
        to see how much is done.
        
        <section className="financeSection">
          <FinanceProgress
            progress={62}
            text="62% der Finanzdaten eingetragen"
          />
        </section>*/}

        <section className="bottomGrid">
          <FinanceChart />
          <RecentEntries />
        </section>

        {/* Eingaben */}
        <section className="financeGrid">
          <FinanceInputCard
            title="Umsatzplanung"
            description="Monatliche Umsätze und Verkaufspreise erfassen"
            buttonText="Eingabe hinzufügen"
          />

          <FinanceInputCard
            title="Kostenplanung"
            description="Fixkosten, variable Kosten und Personalkosten"
            buttonText="Kosten hinzufügen"
          />

          <FinanceInputCard
            title="Liquiditätsplanung"
            description="Gewinne, Verluste und Steuerplanung"
            buttonText="Liquidität erfassen"
          />

          <FinanceInputCard
            title="Kapitalbedarf"
            description="Investitionen und Sicherheitspuffer definieren"
            buttonText="Kapitalbedarf planen"
          />
        </section>

        {/* Finanzkennzahlen */}
        <section className="overviewGrid">
          <FinanceOverviewCard
            title="Deckungsbeitrag"
            value="€24.500"
            status="Positiv"
          />

          <FinanceOverviewCard
            title="Gewinn / Verlust"
            value="+ €8.200"
            status="Gewinn"
          />

          <FinanceOverviewCard
            title="Break-even-Point"
            value="73 Verkäufe"
            status="Stabil"
          />

          <FinanceOverviewCard
            title="Liquidität"
            value="€14.300"
            status="Sicher"
          />
        </section>

        {/* Tabs */}
        <section className="tabsSection">
          <FinanceTabs />
        </section>
      </main>
    </div>
  );
}