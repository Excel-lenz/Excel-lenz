import React, { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "../../styles/pages/taxes/taxes.css";
import TaxCard from "../../components/taxes/taxCard";
import TaxReserveDonut from "../../components/taxes/taxReserveDonut";
import SalesTax from "../../components/taxes/salesTax";
import EstimatedTax from "../../components/taxes/estimatedTax";
import TaxDeadlines from "../../components/taxes/taxDeadlines";
import TaxCheckbox from "../../components/taxes/taxCheckbox";
import TaxOptionGroup from "../../components/taxes/taxOptionGroup";
import { getTaxSummary, updateTaxReserveRate } from "../../api/taxes/taxes";
import { formatCurrency, normalizeCurrencySettings } from "../../utils/currency.jsx";
import { useCurrencySettings } from "../../context/currencySettingsContext.jsx";

export default function Taxes({
    sidebarOpen,
    setSidebarOpen,
    salesOpen,
    setSalesOpen,
    financeOpen,
    setFinanceOpen
    })
{
  const { currencySettings } = useCurrencySettings();

  const [taxData, setTaxData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reserveSaveTimeoutRef = useRef(null);

  useEffect(() => {
    const loadTaxData = async () => {
      try {
        setLoading(true);
        const data = await getTaxSummary();
        setTaxData(data);
        setError(null);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadTaxData();
  }, []);

  const company = useMemo(
    () => normalizeCurrencySettings({
      currency: currencySettings.currency || taxData?.currency,
      locale: currencySettings.locale || taxData?.locale,
    }),
    [currencySettings.currency, currencySettings.locale, taxData?.currency, taxData?.locale]
  );

  const fallbackTaxData = {
    profitBeforeTax: 0,
    availableCapital: 0,
    estimatedTax: {
      tradeTax: 0,
      corporateTax: 0,
    },
    taxReserve: {
      recommendedReserve: 0,
      reserveRate: 35,
    },
    salesTax: {
      collectedSalesTax: 0,
      deductibleInputTax: 0,
    },
  };

  const liveTaxData = taxData || fallbackTaxData;

  //Berechnung ableitbarer Kennzahlen
  const [reserveRate, setReserveRate] = useState(
    liveTaxData.taxReserve.reserveRate
  );

  const currentReserve =
    liveTaxData.availableCapital * (reserveRate / 100);

  useEffect(() => {
    if (taxData?.taxReserve?.reserveRate !== undefined) {
      setReserveRate(taxData.taxReserve.reserveRate);
    }
  }, [taxData?.taxReserve?.reserveRate]);

  useEffect(() => {
    if (!taxData?.taxReserve) return;
    if (reserveRate === taxData.taxReserve.reserveRate) return;

    if (reserveSaveTimeoutRef.current) {
      clearTimeout(reserveSaveTimeoutRef.current);
    }

    reserveSaveTimeoutRef.current = setTimeout(async () => {
      try {
        const saved = await updateTaxReserveRate(reserveRate);

        setTaxData((prev) => ({
          ...prev,
          taxReserve: {
            ...prev.taxReserve,
            reserveRate: saved.reserveRate,
          },
        }));
      } catch (saveError) {
        setError(saveError.message);
      }
    }, 400);

    return () => {
      if (reserveSaveTimeoutRef.current) {
        clearTimeout(reserveSaveTimeoutRef.current);
      }
    };
  }, [reserveRate, taxData]);


  const totalEstimatedTax =
    liveTaxData.estimatedTax.tradeTax +
    liveTaxData.estimatedTax.corporateTax;

  const recommendedReserve = totalEstimatedTax * 1.10;

  const profitAfterTax =
    liveTaxData.profitBeforeTax -
    totalEstimatedTax;

//Beispieldaten
/*
currency: "USD",
locale: "en-US"
currency: "EUR",
locale: "de-DE"
*/
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

  const taxDeadlines = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const shiftIfExtended = (date) => {
      if (vatExtension && reportingPeriod !== "yearly") {
        return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
      }

      return date;
    };

    const formatDeadline = (id, type, date) => ({
      id,
      type,
      date: shiftIfExtended(date).toISOString().slice(0, 10),
    });

    const deadlines = [];

    if (reportingPeriod === "monthly") {
      deadlines.push(
        formatDeadline("vat-1", "Umsatzsteuer-Voranmeldung", new Date(year, month + 1, 10)),
        formatDeadline("vat-2", "Umsatzsteuer-Voranmeldung", new Date(year, month + 2, 10))
      );
    }

    if (reportingPeriod === "quarterly") {
      const quarter = Math.floor(month / 3) + 1;
      deadlines.push(
        formatDeadline("vat-1", `Umsatzsteuer Q${quarter}`, new Date(year, quarter * 3, 10)),
        formatDeadline("vat-2", `Umsatzsteuer Q${quarter + 1}`, new Date(year, quarter * 3 + 3, 10))
      );
    }

    if (reportingPeriod === "yearly") {
      deadlines.push(
        formatDeadline("vat-year", "Umsatzsteuer-Jahreserklärung", new Date(year + 1, 6, 31))
      );
    }

    if (tradeTaxPrepayment) {
      deadlines.push(
        formatDeadline("trade-tax-1", "Gewerbesteuer-Vorauszahlung", new Date(year, 2, 15)),
        formatDeadline("trade-tax-2", "Gewerbesteuer-Vorauszahlung", new Date(year, 5, 15))
      );
    }

    if (corporateTaxPrepayment) {
      deadlines.push(
        formatDeadline("corp-tax-1", "Körperschaftsteuer-Vorauszahlung", new Date(year, 2, 10)),
        formatDeadline("corp-tax-2", "Körperschaftsteuer-Vorauszahlung", new Date(year, 5, 10))
      );
    }

    return deadlines.sort((left, right) => new Date(left.date) - new Date(right.date));
  }, [corporateTaxPrepayment, reportingPeriod, tradeTaxPrepayment, vatExtension]);

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

        {error && (
          <section className="tax-settings-card" style={{ marginBottom: "16px" }}>
            <strong>Fehler:</strong> {error}
          </section>
        )}

        <section className="cards">
          <TaxCard title="Gewinn vor Steuern" color="default">{formatCurrency(liveTaxData.profitBeforeTax, company)}</TaxCard>
          <TaxCard title="Geschätzte Steuerlast" color="orange">{formatCurrency(totalEstimatedTax, company)}</TaxCard>
          <TaxCard title="Steuerrücklagen" color="default">{formatCurrency(currentReserve, company)}</TaxCard>
          <TaxCard title="Gewinn nach Steuern" color="default">{formatCurrency(profitAfterTax, company)}</TaxCard>
        </section>

        <section className="tax-overview">

          <TaxReserveDonut
            availableCapital={liveTaxData.availableCapital}
            recommendedReserve={recommendedReserve}
            reserveRate={reserveRate}
            setReserveRate={setReserveRate}
            currency={company.currency}
            locale={company.locale}
          />

          <div className="tax-right-column">
            <SalesTax
              collectedSalesTax={liveTaxData.salesTax.collectedSalesTax}
              deductibleInputTax={liveTaxData.salesTax.deductibleInputTax}

              dueDate={currentSalesTaxPeriod.dueDate}
              period={currentSalesTaxPeriod.period}
              footerText={currentSalesTaxPeriod.footerText}

              currency={company.currency}
              locale={company.locale}
            />

            <EstimatedTax
              legalForm={taxData?.legalForm || "GmbH"}
              profitBeforeTax={liveTaxData.profitBeforeTax}
              tradeTax={liveTaxData.estimatedTax.tradeTax}
              corporateTax={liveTaxData.estimatedTax.corporateTax}
              currency={company.currency}
              locale={company.locale}
            />
          </div>
        </section>
        {loading && (
          <section className="tax-settings-card" style={{ marginTop: "16px" }}>
            Lade Steuerdaten...
          </section>
        )}
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