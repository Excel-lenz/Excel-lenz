import React from "react";
import "../../styles/components/taxes/salesTax.css";

export default function SalesTax({
    collectedSalesTax,
    deductibleInputTax,
    dueDate,
    period = "Q2 2026",
    footerText,
    currency = "EUR",
    locale = "de-DE",
    })
{

  // Umsatzsteuer-Zahllast berechnen
  const salesTaxLiability = collectedSalesTax - deductibleInputTax;

  // Währungsformatierung
  const formatCurrency = (value) =>
    value.toLocaleString(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  // Status bestimmen
  const status =
    salesTaxLiability > 0
      ? "Zahlung einplanen"
      : salesTaxLiability < 0
      ? "Erstattung erwartet"
      : "Ausgeglichen";

  return (
    <div className="sales-tax-card">
      {/* Header */}
      <div className="sales-tax-header">
        <h3>Umsatzsteuer-Zahllast</h3>
        <span>{period}</span>
      </div>

      {/* Berechnung */}
      <div className="sales-tax-calculation">
        <div className="sales-tax-item">
          <span className="sales-tax-label">Vereinnahmte USt</span>
          <span className="sales-tax-value">{formatCurrency(collectedSalesTax)}</span>
        </div>

        <div className="sales-tax-symbol">−</div>

        <div className="sales-tax-item">
          <span className="sales-tax-label">Vorsteuer</span>
          <span className="sales-tax-value positive">{formatCurrency(deductibleInputTax)}</span>
        </div>

        <div className="sales-tax-symbol">=</div>

        <div className="sales-tax-item">
          <span className="sales-tax-label">Zahllast</span>
          <span
            className={`sales-tax-value ${
              salesTaxLiability >= 0
              ? "warning"
              : "refund"
            }`}
          >
          {formatCurrency(Math.abs(salesTaxLiability))}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="sales-tax-footer">
        <div className="sales-tax-due-date">
          <strong>Fällig am {dueDate}</strong>
          <span>{footerText}</span>
        </div>

        <div className="sales-tax-status">Status: {status}</div>
      </div>
    </div>
  );
}