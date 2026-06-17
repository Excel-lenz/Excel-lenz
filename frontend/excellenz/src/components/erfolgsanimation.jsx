import React from "react";
import "../styles/erfolgsanimation.css";

export default function Erfolgsanimation({ data }) {
  console.log("Erfolgsanimation gerendert:", data);

  return (
    <div className="success-overlay">
      <div className="success-card">
        <img
          src={data.gif}
          alt="success"
          onLoad={() => console.log("✅ GIF erfolgreich geladen")}
          onError={() => console.log("❌ GIF konnte NICHT geladen werden")}
        />

        <h2>{data.title}</h2>

        <p>{data.goalName}</p>

        {data.reward && (
          <strong>{data.reward}</strong>
        )}
      </div>
    </div>
  );
}