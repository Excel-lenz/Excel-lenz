import React from "react";
import "../../styles/components/taxes/taxReserveDonut.css";

export default function TaxReserveDonut({
    availableCapital,
    recommendedReserve,
    reserveRate,
    setReserveRate,
    currency = "EUR",
    locale = "de-DE",
    })
{

  // Aktuelle Rücklage anhand der Rücklagenquote berechnen
  const currentReserve =
    availableCapital * (reserveRate / 100);

  // Deckungsgrad berechnen
  const percentage =
    recommendedReserve > 0
      ? Math.min(
          (currentReserve / recommendedReserve) * 100,
          100
        )
      : 0;

  // Differenz zwischen aktueller und empfohlener Rücklage
  const difference =
    currentReserve - recommendedReserve;

  // berechnen des Kreisdiagramm
  const radius = 130;
  const stroke = 20;
  const normalizedRadius = radius - stroke / 2;
  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (percentage / 100) * circumference;

  // Währungsformatierung
  const formatCurrency = (value) =>
    value.toLocaleString(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });

  const formattedAmount =
    formatCurrency(currentReserve);

  // Textgröße im kreisdiagramm
  const amountFontSize = (() => {
    const length = formattedAmount.length;

    if (length <= 8) return 42;
    if (length <= 10) return 36;
    if (length <= 12) return 30;
    if (length <= 14) return 26;

    return 22;
  })();


  return (
    <div className="tax-reserve-card">
      <h3>Steuerrücklage</h3>

      <div className="donut-wrapper">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            className="donut-bg"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            className="donut-progress"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>

        <div className="donut-center">
          <strong style={{fontSize: `${amountFontSize}px`}}>
            {formattedAmount}
          </strong>
          <span>Aktuelle Rücklage</span>
        </div>
      </div>

      <div className="tax-details">
        <div className="tax-data-row">
          <span>Benötigte Rücklagen</span>
          <strong>{formatCurrency(recommendedReserve, currency, locale)}</strong>
        </div>
        <div className="tax-data-row">
          <span>Aktuelle Rücklagen</span>
          <strong>{formatCurrency(currentReserve, currency, locale)}</strong>
        </div>
        <div className="tax-data-row">
          <span>Differenz</span>
          <strong>{difference >= 0 ? "+" : ""}{formatCurrency(difference, currency, locale)}</strong>
        </div>
      </div>

      <div className="reserve-status">
        {percentage >= 100
          ? "Sehr gut! Deine Rücklage deckt die empfohlene Steuerlast ab."
          : `Deine Rücklage deckt ${Math.round(
              percentage
            )}% der empfohlenen Steuerlast.`}
      </div>

      <div className="reserve-slider-box">
        <div className="reserve-slider-header">
          <span>Rücklagenquote</span>
          <strong>{reserveRate}%</strong>
        </div>

        <input
          type="range"
          min="10"
          max="60"
          step="1"
          value={reserveRate}
          onChange={(e) => setReserveRate(Number(e.target.value))}
          className="reserve-slider"
        />
      </div>
    </div>
  );
}