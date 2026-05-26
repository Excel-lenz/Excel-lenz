import React, { useEffect, useRef, useState } from "react";
import "../styles/components/loadingScreen.css";

export default function LoadingScreen({ onComplete, holdMs = 700 }) {
  const [phase, setPhase] = useState("in"); // in | hold | out | done
  const t = useRef(null);

  useEffect(() => {
    if (phase === "in")   t.current = setTimeout(() => setPhase("hold"), 2300);
    if (phase === "hold") t.current = setTimeout(() => setPhase("out"),  holdMs);
    if (phase === "out")  t.current = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 2400); // same duration as fade-in
    return () => clearTimeout(t.current);
  }, [phase, holdMs, onComplete]);

  if (phase === "done") return null;

  return (
    <div className={`ls-overlay ls-${phase}`} aria-hidden="true">
      <div className="ls-logo-wrap">
        <svg className="ls-svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" fill="none">

          <circle className="ls-path ls-outer-ring"
            cx="120" cy="120" r="108" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" />

          <circle className="ls-path ls-inner-ring"
            cx="120" cy="120" r="94" stroke="#00ff88" strokeWidth="0.9" opacity="0.45" />

          <g className="ls-path ls-doc">
            <rect x="52" y="66" width="30" height="38" rx="3" stroke="#00ff88" strokeWidth="1.8" />
            <line x1="59" y1="77" x2="75" y2="77" stroke="#00ff88" strokeWidth="1.4" />
            <line x1="59" y1="85" x2="75" y2="85" stroke="#00ff88" strokeWidth="1.4" />
            <line x1="59" y1="93" x2="68" y2="93" stroke="#00ff88" strokeWidth="1.4" />
          </g>

          <path className="ls-path ls-conn1"
            d="M82 98 Q100 108 104 118" stroke="#00ff88" strokeWidth="1.3" opacity="0.6" />

          <circle className="ls-path ls-gear-ring"
            cx="120" cy="130" r="22" stroke="#00ff88" strokeWidth="2.4" />

          <g className="ls-path ls-gear-teeth" stroke="#00ff88" strokeWidth="2.2" strokeLinecap="round">
            <line x1="120" y1="104" x2="120" y2="98" />
            <line x1="120" y1="156" x2="120" y2="162" />
            <line x1="94"  y1="130" x2="88"  y2="130" />
            <line x1="146" y1="130" x2="152" y2="130" />
            <line x1="103" y1="113" x2="99"  y2="109" />
            <line x1="137" y1="147" x2="141" y2="151" />
            <line x1="137" y1="113" x2="141" y2="109" />
            <line x1="103" y1="147" x2="99"  y2="151" />
          </g>

          <path className="ls-path ls-check"
            d="M111 130 l7 7 l12 -12" stroke="#00ff88" strokeWidth="2.8"
            strokeLinecap="round" strokeLinejoin="round" />

          <path className="ls-path ls-conn2"
            d="M143 118 Q152 108 158 98" stroke="#00ff88" strokeWidth="1.3" opacity="0.6" />

          <g className="ls-path ls-bars" stroke="#00ff88" strokeWidth="1.8">
            <rect x="148" y="118" width="9" height="22" rx="1.5" />
            <rect x="160" y="108" width="9" height="32" rx="1.5" />
            <rect x="172" y="96"  width="9" height="44" rx="1.5" />
          </g>

          <text className="ls-text ls-text-excel"
            x="80" y="212" textAnchor="middle" fill="#eaeaf0"
            fontFamily="'Arial Black','Helvetica Neue',sans-serif"
            fontSize="28" fontWeight="900" letterSpacing="-0.5">Excel-</text>

          <text className="ls-text ls-text-lenz"
            x="174" y="212" textAnchor="middle" fill="#00ff88"
            fontFamily="'Arial Black','Helvetica Neue',sans-serif"
            fontSize="28" fontWeight="900" letterSpacing="-0.5">Lenz</text>

        </svg>
      </div>
    </div>
  );
}