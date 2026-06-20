import React from "react";
import "../../styles/components/taxes/taxOptionGroup.css";

export default function TaxOptionGroup({
    label,
    options,
    value,
    onChange,
    })
{
  return (
    <div className="tax-option-group">
      <span className="tax-option-group-label">
        {label}
      </span>

      <div className="tax-option-list">
        {options.map((option) => (
          <label
            key={option.value}
            className={`tax-option ${
              value === option.value ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />

            <span className="tax-option-box">
              {value === option.value ? "✓" : ""}
            </span>

            <span className="tax-option-label">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}