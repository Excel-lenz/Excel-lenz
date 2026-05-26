import React from "react";
import "../../styles/components/finance/financeInputCard.css";

export default function FinanceInputCard({
  title,
  description,
  buttonText,
}) {
  return (
    <div className="financeInputCard">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button className="financeButton">
        {buttonText}
      </button>
    </div>
  );
}