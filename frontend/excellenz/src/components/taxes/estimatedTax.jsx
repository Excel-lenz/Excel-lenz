import React from "react";
import "../../styles/components/taxes/estimatedTax.css";

export default function EstimatedTax({
    legalForm,
    profitBeforeTax,
    tradeTax,
    corporateTax,
    currency = "EUR",
    locale = "de-DE",
    })
{
  const isCorporation = ["GmbH", "UG"].includes(legalForm);

  const estimatedTaxTotal = isCorporation
    ? tradeTax + corporateTax
    : tradeTax;

  const formatCurrency = (value) =>
    value.toLocaleString(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });

  return (
    <div className="estimated-tax-card">
      <div className="estimated-tax-header">
        <h3>Geschätzte Steuerlast</h3>
        <span>{legalForm}</span>
      </div>

      <div className="estimated-tax-list">
        <div className="estimated-tax-row">
          <span>Gewinn vor Steuern</span>
          <strong>{formatCurrency(profitBeforeTax)}</strong>
        </div>

        <div className="estimated-tax-row">
          <span>Gewerbesteuer</span>
          <strong>{formatCurrency(tradeTax)}</strong>
        </div>

        {isCorporation && (
          <div className="estimated-tax-row">
            <span>Körperschaftsteuer</span>
            <strong>{formatCurrency(corporateTax)}</strong>
          </div>
        )}

        <div className="estimated-tax-divider" />

        <div className="estimated-tax-row total">
          <span>Gesamt</span>
          <strong>{formatCurrency(estimatedTaxTotal)}</strong>
        </div>
      </div>
    </div>
  );
}