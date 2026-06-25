import React from "react";
import "../../styles/components/taxes/taxCheckbox.css";

export default function TaxCheckbox({
    label,
    checked,
    onChange,
    })
{
  return (
    <label className="tax-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span className="tax-checkbox-box">
        {checked ? "✓" : ""}
      </span>

      <span className="tax-checkbox-label">
        {label}
      </span>
    </label>
  );
}