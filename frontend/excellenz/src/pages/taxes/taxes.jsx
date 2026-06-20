import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/taxes/taxes.css";
import TaxCard from "../../components/taxes/taxCard";
import TaxReserveDonut from "../../components/taxes/taxReserveDonut";
import SalesTax from "../../components/taxes/salesTax";
import EstimatedTax from "../../components/taxes/estimatedTax";
import TaxDeadlines from "../../components/taxes/taxDeadlines";
import TaxCheckbox from "../../components/taxes/taxCheckbox";
import TaxOptionGroup from "../../components/taxes/taxOptionGroup";

export default function Taxes({
    sidebarOpen,
    setSidebarOpen,
    salesOpen,
    setSalesOpen,
    financeOpen,
    setFinanceOpen
    })
{

  const company = {
    currency: "EUR",
    locale: "de-DE"
  };

  //Finanzdaten-Array
  const taxData = {
    profitBeforeTax: 85000,

    availableCapital: 200000,

    estimatedTax: {
      tradeTax: 17000,
      corporateTax: 17000,
    },

    taxReserve: {
      recommendedReserve: 34000,
      reserveRate: 35,
    },

    salesTax: {
      collectedSalesTax: 38000,
      deductibleInputTax: 21850,
    },
  };

  //Berechnung ableitbarer Kennzahlen
  const [reserveRate, setReserveRate] = useState(
    taxData.taxReserve.reserveRate
  );

  const currentReserve =
    taxData.availableCapital * (reserveRate / 100);


  const totalEstimatedTax =
    taxData.estimatedTax.tradeTax +
    taxData.estimatedTax.corporateTax;

  taxData.taxReserve.recommendedReserve = totalEstimatedTax * 1.10;

  const profitAfterTax =
    taxData.profitBeforeTax -
    totalEstimatedTax;

//Beispieldaten
/*
currency: "USD",
locale: "en-US"
currency: "EUR",
locale: "de-DE"
*/
  //Formatierung der Währung
  const formatCurrency = (value) =>
    value.toLocaleString(company.locale, {
      style: "currency",
      currency: company.currency,
      maximumFractionDigits: 0,
    });

  //Fristen-Array
  const taxDeadlines = [
    {
      id: 1,
      type: "Umsatzsteuer-Voranmeldung",
      date: "2026-06-10",
    },
    {
      id: 2,
      type: "Gewerbesteuer",
      date: "2026-06-24",
    },
    {
      id: 3,
      type: "Umsatzsteuer-Voranmeldung",
      date: "2026-07-10",
    },
    {
      id: 4,
      type: "Gewerbesteuer",
      date: "2026-08-15",
    },
    {
      id: 5,
      type: "Körperschaftsteuer",
      date: "2026-09-10",
    },
  ];

  //UseStates für Häckchenkästchen
  const [vatExtension, setVatExtension] = useState(false);
  const [tradeTaxPrepayment, setTradeTaxPrepayment] = useState(false);
  const [corporateTaxPrepayment, setCorporateTaxPrepayment] = useState(false);

  const [reportingPeriod, setReportingPeriod] = useState("yearly");

  const getSalesTaxPeriodData = (
    reportingPeriod,
    vatExtension,
    locale
  ) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const formatDate = (date) =>
      date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

    let period;
    let dueDate;
    let footerText;

    if (reportingPeriod === "monthly") {
      period = today.toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
      });

      dueDate = new Date(year, month + 1, 10);
      footerText = "bei monatlicher Voranmeldung";
    }

    if (reportingPeriod === "quarterly") {
      const quarter = Math.floor(month / 3) + 1;
      const quarterEndMonth = quarter * 3;

      period = `Q${quarter} ${year}`;
      dueDate = new Date(year, quarterEndMonth, 10);
      footerText = "bei quartalsweiser Voranmeldung";
    }

    if (reportingPeriod === "yearly") {
      period = `${year}`;
      dueDate = new Date(year + 1, 6, 31);
      footerText = "bei jährlicher Abgabe";
    }

    if (
      vatExtension &&
      reportingPeriod !== "yearly"
    ) {
      dueDate.setMonth(dueDate.getMonth() + 1);
    }

    return {
      period,
      dueDate: formatDate(dueDate),
      footerText,
    };
  };

  const currentSalesTaxPeriod = getSalesTaxPeriodData(
    reportingPeriod,
    vatExtension,
    company.locale
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

      <main className="main">
        <header className="header">
          <div>
            <h1 className="title">Steuern</h1>
            <p className="subtitle">Behalte deine Steuerlast, Rücklagen und Fristen immer im Blick.</p>
          </div>
        </header>

        <section className="cards">
          <TaxCard title="Gewinn vor Steuern" color="default">{formatCurrency(taxData.profitBeforeTax)}</TaxCard>
          <TaxCard title="Geschätzte Steuerlast" color="orange">{formatCurrency(totalEstimatedTax)}</TaxCard>
          <TaxCard title="Steuerrücklagen" color="default">{formatCurrency(currentReserve)}</TaxCard>
          <TaxCard title="Gewinn nach Steuern" color="default">{formatCurrency(profitAfterTax)}</TaxCard>
        </section>

        <section className="tax-overview">

          <TaxReserveDonut
            availableCapital={taxData.availableCapital}
            recommendedReserve={taxData.taxReserve.recommendedReserve}
            reserveRate={reserveRate}
            setReserveRate={setReserveRate}
            currency={company.currency}
            locale={company.locale}
          />

          <div className="tax-right-column">
            <SalesTax
              collectedSalesTax={taxData.salesTax.collectedSalesTax}
              deductibleInputTax={taxData.salesTax.deductibleInputTax}

              dueDate={currentSalesTaxPeriod.dueDate}
              period={currentSalesTaxPeriod.period}
              footerText={currentSalesTaxPeriod.footerText}

              currency={company.currency}
              locale={company.locale}
            />

            <EstimatedTax
              legalForm="GmbH"
              profitBeforeTax={taxData.profitBeforeTax}
              tradeTax={taxData.estimatedTax.tradeTax}
              corporateTax={taxData.estimatedTax.corporateTax}
              currency={company.currency}
              locale={company.locale}
            />
          </div>
        </section>
        <section className="tax-deadlines-section">
          <TaxDeadlines
            deadlines={taxDeadlines}
            locale={company.locale}
          />
        </section>
        <section className="tax-settings-card">
            <h3>Fristen-Einstellungen</h3>

            <div className="tax-checkbox-row">
              <TaxCheckbox
                label="Umsatzsteur-Dauerfristverlängerung"
                checked={vatExtension}
                onChange={setVatExtension}
              />

              <TaxCheckbox
                label="Gewerbesteuervorausszahlungen"
                checked={tradeTaxPrepayment}
                onChange={setTradeTaxPrepayment}
              />

              <TaxCheckbox
                label="Körperschaftssteuervorausszahlungen"
                checked={corporateTaxPrepayment}
                onChange={setCorporateTaxPrepayment}
              />

              <TaxOptionGroup
                label="Umsatzsteur-Voranmeldungszeitraum"
                value={reportingPeriod}
                onChange={setReportingPeriod}
                options={[
                  {
                    value: "monthly",
                    label: "Monatlich",
                  },
                  {
                    value: "quarterly",
                    label: "Quartalsweise",
                  },
                  {
                    value: "yearly",
                    label: "Jährlich",
                  },
                ]}
              />
            </div>
        </section>
      </main>
    </div>
  );
}