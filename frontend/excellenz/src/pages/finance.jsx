import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import FinanceInputCard from "../components/finance/financeInputCard";
import FinanceOverviewCard from "../components/finance/financeOverviewCard";
import FinanceProgress from "../components/finance/financeProgress";
import FinanceTabs from "../components/finance/financeTabs";
import FinanceChart from "../components/finance/financeChart";
import RecentEntries from "../components/finance/recentEntries"; 
import Input from "../components/inputs";
import { getCapital } from "../api/funcs";
import { getCompanySettings } from "../api/company";
import { getTransactions } from "../api/inputs/inputAPI";
import { formatCurrency, normalizeCurrencySettings } from "../utils/currency";

import "../styles/pages/finance.css";

export default function Finance({ sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen }) {
  const [capital, setCapital] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [companySettings, setCompanySettings] = useState(() => normalizeCurrencySettings());

  const loadFinanceData = async () => {
    const [capitalData, transactionData, settings] = await Promise.all([
      getCapital(),
      getTransactions(),
      getCompanySettings(),
    ]);

    setCapital(Number(capitalData.capital || 0));
    setTransactions(transactionData);
    setCompanySettings(normalizeCurrencySettings(settings));
  };

  useEffect(() => {
    loadFinanceData().catch((error) => {
      console.error("Fehler beim Laden der Finanzdaten:", error);
    });
  }, []);

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.total ?? transaction.price * transaction.quantity), 0);

  const expenseTotal = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.total ?? transaction.price * transaction.quantity), 0);

  const netCashflow = incomeTotal - expenseTotal;

  return (
    <div className="layout">

      <Input onCreated={loadFinanceData} />

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
          <FinanceChart transactions={transactions} currencySettings={companySettings} />
          <RecentEntries transactions={transactions} currencySettings={companySettings} />
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
            title="Gesamter Umsatz"
            value={formatCurrency(incomeTotal, companySettings)}
            status="Live aus dem Backend"
          />

          <FinanceOverviewCard
            title="Gesamtausgaben"
            value={formatCurrency(expenseTotal, companySettings)}
            status="Live aus dem Backend"
          />

          <FinanceOverviewCard
            title="Netto-Cashflow"
            value={formatCurrency(netCashflow, companySettings)}
            status={netCashflow >= 0 ? "Positiv" : "Negativ"}
          />

          <FinanceOverviewCard
            title="Unternehmenskapital"
            value={formatCurrency(capital, companySettings)}
            status="Backend-Wert"
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