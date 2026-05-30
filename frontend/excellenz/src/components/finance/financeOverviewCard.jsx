import React from "react";
import "../../styles/components/finance/financeOverviewCard.css";

export default function FinanceOverviewCard({
  title,
  value,
  status,
}) {
  return (
    <div className="financeOverviewCard">
      <span className="overviewLabel">{title}</span>

      <h2>{value}</h2>

      <div className="overviewStatus">
        {status}
      </div>
    </div>
  );
}