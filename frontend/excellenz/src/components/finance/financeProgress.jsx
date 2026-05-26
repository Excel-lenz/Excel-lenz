import React from "react";
import "../../styles/components/finance/financeProgress.css";

export default function FinanceProgress({
  progress,
  text,
}) {
  return (
    <div className="financeProgressWrapper">
      <div className="financeProgressTop">
        <span>Fortschritt</span>
        <span>{progress}%</span>
      </div>

      <div className="financeProgressBar">
        <div
          className="financeProgressFill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>{text}</p>
    </div>
  );
}