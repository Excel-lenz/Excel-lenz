import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Settings({ sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen }) {
  // --- ESTADOS INTERACTIVOS (Pure Frontend para la presentación) ---
  const [language, setLanguage] = useState("Deutsch");
  const [currency, setCurrency] = useState("EUR");
  const [numberFormat, setNumberFormat] = useState("Punkt");
  const [popupsEnabled, setPopupsEnabled] = useState(true);
  
  const [fiscalYearStart, setFiscalYearStart] = useState("Januar");
  const [budgetWarning, setBudgetWarning] = useState(85);
  const [privacyMode, setPrivacyMode] = useState(false);

  // Moneda simulada para la demostración visual
  const getCurrencySymbol = () => {
    if (currency === "USD") return "$";
    if (currency === "CHF") return "CHF";
    return "€";
  };

  return (
    <div style={styles.layoutWrapper}>
      {/* Mantenemos la Sidebar original de tu equipo */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        salesOpen={salesOpen}
        setSalesOpen={setSalesOpen}
        financeOpen={financeOpen}
        setFinanceOpen={setFinanceOpen}
      />

      {/* --- PANEL PRINCIPAL DE AJUSTES --- */}
      <div style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <h1 style={styles.mainTitle}>Einstellungen</h1>
          <p style={styles.subtitle}>Systemkonfiguration und Benutzeroberfläche</p>
        </div>

        <div style={styles.gridContainer}>
          
          {/* SECCIÓN 1: UI & ANZEIGE */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.icon}>👁️</span> Anzeige & Benutzeroberfläche
            </h2>
            
            {/* Idioma */}
            <div style={styles.settingRow}>
              <label style={styles.label}>Systemsprache (Language)</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
                <option value="Deutsch">Deutsch</option>
                <option value="English">English</option>
                <option value="Español">Español</option>
              </select>
            </div>

            {/* Moneda */}
            <div style={styles.settingRow}>
              <label style={styles.label}>Standard-Währung</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={styles.select}>
                <option value="EUR">Euro (€)</option>
                <option value="USD">US-Dollar ($)</option>
                <option value="CHF">Schweizer Franken (CHF)</option>
              </select>
            </div>

            {/* Formato numérico */}
            <div style={styles.settingRow}>
              <label style={styles.label}>Zahlenformat (Tausendertrennzeichen)</label>
              <select value={numberFormat} onChange={(e) => setNumberFormat(e.target.value)} style={styles.select}>
                <option value="Punkt">Punkt (z.B. 10.000)</option>
                <option value="Komma">Komma (z.B. 10,000)</option>
              </select>
            </div>

            {/* Popups */}
            <div style={styles.settingRowInline}>
              <label style={styles.label}>System-Popups erlauben</label>
              <button 
                onClick={() => setPopupsEnabled(!popupsEnabled)} 
                style={popupsEnabled ? styles.switchOn : styles.switchOff}
              >
                {popupsEnabled ? "JA" : "NEIN"}
              </button>
            </div>
          </div>

          {/* SECCIÓN 2: FINANZLOGIK & SICHERHEIT */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.icon}>🛡️</span> Finanzlogik & Sicherheit
            </h2>

            {/* Año Fiscal con los 12 meses completos del año */}
            <div style={styles.settingRow}>
              <label style={styles.label}>Geschäftsjahr anpassen (Startmonat)</label>
              <select value={fiscalYearStart} onChange={(e) => setFiscalYearStart(e.target.value)} style={styles.select}>
                <option value="Januar">Januar</option>
                <option value="Februar">Februar</option>
                <option value="März">März</option>
                <option value="April">April</option>
                <option value="Mai">Mai</option>
                <option value="Juni">Juni</option>
                <option value="Juli">Juli</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="Oktober">Oktober</option>
                <option value="November">November</option>
                <option value="Dezember">Dezember</option>
              </select>
            </div>

            {/* Slider de Presupuesto (Corregido para alertar > 85%) */}
            <div style={styles.settingRow}>
              <div style={styles.sliderLabelRow}>
                <label style={styles.label}>Budgetgrenzen-Warnung</label>
                <span style={budgetWarning > 85 ? styles.valueCritical : styles.valueNormal}>
                  {budgetWarning}%
                </span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={budgetWarning} 
                onChange={(e) => setBudgetWarning(Number(e.target.value))} 
                style={styles.slider}
              />
              <p style={styles.hintText}>
                Warnfarbe wird aktiviert bei Überschreitung des Limits.
              </p>
            </div>

            {/* Switch de Privacidad */}
            <div style={styles.settingRowInline}>
              <div>
                <label style={styles.label}>Sicherheitsmodus (Privatsphäre)</label>
                <p style={styles.hintText}>Blendet sensible Daten im Dashboard aus.</p>
              </div>
              <button 
                onClick={() => setPrivacyMode(!privacyMode)} 
                style={privacyMode ? styles.switchOn : styles.switchOff}
              >
                {privacyMode ? "AKTIV" : "INAKTIV"}
              </button>
            </div>
          </div>

        </div>

        {/* --- DEMO VIVAS PARA EL PROFESOR (Limpio y corregido para > 85%) --- */}
        <div style={styles.demoBox}>
          <h3 style={{ color: "#FFFFFF", marginTop: 0, fontSize: "16px", fontFamily: "Poppins" }}>
            Live-Vorschau (Einfluss auf das Dashboard)
          </h3>
          <div style={styles.demoFlex}>
            <div style={styles.demoItem}>
              <span style={styles.demoLabel}>Aktueller Saldo:</span>
              <span style={styles.demoValue}>
                {privacyMode ? "*** " + getCurrencySymbol() : (numberFormat === "Punkt" ? "45.250" : "45,250") + " " + getCurrencySymbol()}
              </span>
            </div>
            <div style={styles.demoItem}>
              <span style={styles.demoLabel}>Budget-Status:</span>
              <span style={budgetWarning > 85 ? styles.statusCritical : styles.statusNormal}>
                {budgetWarning > 85 ? "KRITISCH" : "NORMAL"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- ESTILOS EN LINEA (100% camelCase y sin guiones) ---
const styles = {
  layoutWrapper: {
    display: "flex",
    backgroundColor: "#0c1c1c",
    minHeight: "100vh",
    width: "100vw",
    overflowX: "hidden",
  },
  mainContent: {
    flexGrow: 1,
    padding: "40px 60px",
    backgroundColor: "#0c1c1c",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  headerContainer: {
    marginBottom: "40px",
    borderBottom: "1px solid #2C3E40",
    paddingBottom: "20px",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: "36px",
    margin: 0,
    fontWeight: "700",
  },
  subtitle: {
    color: "#8A9B9B",
    margin: "5px 0 0 0",
    fontSize: "16px",
  },
  gridContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#152929",
    border: "1px solid rgba(46, 204, 113, 0.2)",
    borderRadius: "12px",
    padding: "30px",
    flex: "1 1 450px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  },
  cardTitle: {
    color: "#2ECC71",
    fontSize: "20px",
    margin: "0 0 25px 0",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
  },
  settingRow: {
    marginBottom: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  settingRowInline: {
    marginBottom: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10px",
  },
  label: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "500",
  },
  select: {
    backgroundColor: "#0c1c1c",
    border: "1px solid #2C3E40",
    borderRadius: "6px",
    color: "#FFFFFF",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  },
  sliderLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    width: "100%",
    accentColor: "#2ECC71",
    cursor: "pointer",
    margin: "10px 0",
  },
  valueNormal: {
    color: "#2ECC71",
    fontWeight: "700",
  },
  valueCritical: {
    color: "#f53420",
    fontWeight: "700",
  },
  hintText: {
    color: "#8A9B9B",
    fontSize: "12px",
    margin: 0,
  },
  switchOn: {
    backgroundColor: "#2ECC71",
    color: "#0c1c1c",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.2s ease",
  },
  switchOff: {
    backgroundColor: "#2C3E40",
    color: "#8A9B9B",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.2s ease",
  },
  demoBox: {
    backgroundColor: "#0a1414",
    borderLeft: "4px solid #2ECC71",
    padding: "20px 25px",
    borderRadius: "0 8px 8px 0",
  },
  demoFlex: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  demoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  demoLabel: {
    color: "#8A9B9B",
    fontSize: "13px",
  },
  demoValue: {
    color: "#FFFFFF",
    fontSize: "22px",
    fontWeight: "700",
  },
  statusNormal: {
    color: "#2ECC71",
    fontSize: "16px",
    fontWeight: "700",
  },
  statusCritical: {
    color: "#f53420",
    fontSize: "16px",
    fontWeight: "700",
  },
};