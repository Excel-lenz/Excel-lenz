import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/landing/landingPage.css";
import logoFull from "../../assets/logo.png";


export default function LandingPage() {
  return (
    <div className="landing">
      <header className="landingHeader">
        <div className="landingBrand">
          <div className="brandIcon">
            <img src={logoFull} alt="Excellenz logo"/>
          </div>
          <span>Excellenz</span>
        </div>
        <nav className="landingNav">
          <Link to="/login" className="navLink">
            Login
          </Link>
          <Link to="/register" className="navButton">
            Registrieren
          </Link>
        </nav>
      </header>
      <main className="landingMain">
        <section className="hero">
          <div className="heroContent">
            <div className="heroBadge">Live Dashboard für dein Umsatzziel</div>
            <h1>
              Behalte deine Performance im Blick und erreiche deine Ziele
              schneller.
            </h1>
            <p>
              Excellenz hilft dir dabei, Fortschritte, Trends und Meilensteine
              übersichtlich zu verfolgen. So siehst du jederzeit, ob du auf Kurs
              bist und welche nächsten Schritte wichtig sind.
            </p>
            <div className="heroActions">
              <Link to="/register" className="primaryButton">
                Kostenlos starten
              </Link>
              <Link to="/login" className="secondaryButton">
                Einloggen
              </Link>
            </div>
          </div>
          <div className="heroPreview">
            <div className="previewHeader">
              <span>Umsatzziel Fortschritt</span>
              <div className="previewStatus">Auf Kurs</div>
            </div>
            <div className="previewProgress">
              <div className="previewProgressTop">
                <span>68% erreicht</span>
                <span>€136.000 / €200.000</span>
              </div>
              <div className="previewProgressBar">
                <div className="previewProgressFill" />
              </div>
            </div>
            <div className="previewChart">
              <svg
                className="previewChartSvg"
                viewBox="0 0 500 190"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00ff88" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                  <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0, 255, 136, 0.22)" />
                    <stop offset="100%" stopColor="rgba(0, 255, 136, 0)" />
                  </linearGradient>
                </defs>
                <path
                  className="chartArea"
                  d="M30 145 C110 132, 165 118, 230 103 C300 86, 365 77, 470 58 L470 170 L30 170 Z"
                />
                <path
                  className="chartMainLine"
                  d="M30 145 C110 132, 165 118, 230 103 C300 86, 365 77, 470 58"
                />
                <path
                  className="chartSoftLine"
                  d="M30 112 C120 120, 190 128, 260 136 C340 145, 400 151, 470 158"
                />
                <circle className="chartPoint" cx="470" cy="58" r="6" />
              </svg>
            </div>
            <div className="previewCards">
              <div>
                <span>Status</span>
                <strong>Auf Kurs</strong>
              </div>
              <div>
                <span>Performance</span>
                <strong>+12%</strong>
              </div>
              <div>
                <span>Zieltrend</span>
                <strong>Wachsend</strong>
              </div>
            </div>
          </div>
        </section>
        <section className="infoGrid">
          <article className="infoCard">
            <div className="infoIcon">01</div>
            <h3>Ziele verfolgen</h3>
            <p>
              Definiere dein Umsatzziel und erkenne sofort, wie weit du bereits
              gekommen bist.
            </p>
          </article>
          <article className="infoCard">
            <div className="infoIcon">02</div>
            <h3>Performance analysieren</h3>
            <p>
              Sieh Trends, Fortschritte und Veränderungen deiner Zahlen in einer
              klaren Übersicht.
            </p>
          </article>
          <article className="infoCard">
            <div className="infoIcon">03</div>
            <h3>Meilensteine erreichen</h3>
            <p>
              Behalte den nächsten Meilenstein im Fokus und bleibe motiviert auf
              deinem Weg.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}