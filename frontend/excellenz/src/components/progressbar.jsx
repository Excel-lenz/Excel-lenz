import React from "react";
import "../styles/components/progressbar.css";

export default function ProgressBar({ value }) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
      <p className="progress-label">{value}% des Ziels erreicht</p>
    </div>
  );
}
