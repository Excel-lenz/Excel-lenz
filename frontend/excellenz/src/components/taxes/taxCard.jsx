import React from "react";
import "../../styles/components/taxes/taxCard.css";

export default function TaxCard({
    title,
    children,
    color = "default"
    })
{

  return (
    <div className={`card-${color}`}>
      <h3 className={`card-title-${color}`}>
        {title}
      </h3>
      {children}
    </div>
  );
}