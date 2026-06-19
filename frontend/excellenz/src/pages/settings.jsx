import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

// --- COMPONENTE DESPLEGABLE PERSONALIZADO (Verde Excellenz Puro) ---
function CustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.customSelectTrigger}
      >
        <span>{options.find(o => o.value === value)?.label || value}</span>
        <span style={{ color: "#8A9B9B", fontSize: "12px" }}>▼</span>
      </div>
      
      {isOpen && (
        <>
          <div style={styles.dropdownOverlay} onClick={() => setIsOpen(false)} />
          <div style={styles.dropdownListContainer}>
            {options.map((opt) => (
              <div 
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  ...styles.dropdownItem,
                  backgroundColor: value === opt.value ? "rgba(46, 204, 113, 0.2)" : "transparent",
                  color: value === opt.value ? "#2ECC71" : "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                  e.target.style.color = "#2ECC71";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = value === opt.value ? "rgba(46, 204, 113, 0.2)" : "transparent";
                  e.target.style.color = value === opt.value ? "#2ECC71" : "#FFFFFF";
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Settings({ sidebarOpen, setSidebarOpen, salesOpen, setSalesOpen, financeOpen, setFinanceOpen }) {
  const [language, setLanguage] = useState("Deutsch");
  const [currency, setCurrency] = useState("EUR");
  const [numberFormat, setNumberFormat] = useState("Punkt");
  const [popupsEnabled, setPopupsEnabled] = useState(true);
  
  const [fiscalYearStart, setFiscalYearStart] = useState("Januar");
  const [budgetWarning, setBudgetWarning] = useState(85);

  // Estados locales para el perfil de usuario y seguridad
  const [email, setEmail] = useState("user@excellenz.de");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);

  // Estados para el Modal/Pop-up interactivo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const getCurrencySymbol = () => {
    if (currency === "USD") return "$";
    if (currency === "CHF") return "CHF";
    return "€";
  };

  const handleOpenModal = () => {
    setIsConfirmed(false);
    setIsModalOpen(true);
  };

  const handleConfirmChanges = () => {
    setIsConfirmed(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const languageOptions = [
    { value: "Deutsch", label: "Deutsch" },
    { value: "English", label: "English" },
    { value: "Español", label: "Español" }
  ];

  const currencyOptions = [
    { value: "EUR", label: "Euro (€)" },
    { value: "USD", label: "US-Dollar ($)" },
    { value: "CHF", label: "Schweizer Franken (CHF)" }
  ];

  const formatOptions = [
    { value: "Punkt", label: "Punkt (z.B. 10.000)" },
    { value: "Komma", label: "Komma (z.B. 10,000)" }
  ];

  const monthOptions = [
    { value: "Januar", label: "Januar" }, { value: "Februar", label: "Februar" },
    { value: "März", label: "März" }, { value: "April", label: "April" },
    { value: "Mai", label: "Mai" }, { value: "Juni", label: "Juni" },
    { value: "Juli", label: "Juli" }, { value: "August", label: "August" },
    { value: "September", label: "September" }, { value: "Oktober", label: "Oktober" },
    { value: "November", label: "November" }, { value: "Dezember", label: "Dezember" }
  ];

  return (
    <div style={styles.layoutWrapper}>
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        salesOpen={salesOpen}
        setSalesOpen={setSalesOpen}
        financeOpen={financeOpen}
        setFinanceOpen={setFinanceOpen}
      />

      <div style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <h1 style={styles.mainTitle}>Einstellungen</h1>
          <p style={styles.subtitle}>Systemkonfiguration und Benutzeroberfläche</p>
        </div>

        <div style={styles.gridContainer}>
          
          {/* SECCIÓN 1: UI & ANZEIGE */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "12px" }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Anzeige & Benutzeroberfläche
            </h2>
            
            <div style={styles.settingRow}>
              <label style={styles.label}>Systemsprache (Language)</label>
              <CustomSelect value={language} onChange={setLanguage} options={languageOptions} />
            </div>

            <div style={styles.settingRow}>
              <label style={styles.label}>Standard-Währung</label>
              <CustomSelect value={currency} onChange={setCurrency} options={currencyOptions} />
            </div>

            <div style={styles.settingRow}>
              <label style={styles.label}>Zahlenformat (Tausendertrennzeichen)</label>
              <CustomSelect value={numberFormat} onChange={setNumberFormat} options={formatOptions} />
            </div>

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

          {/* SECCIÓN 2: FINANZLOGIK */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "12px" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Finanzlogik &amp; Warnungen
            </h2>

            <div style={styles.settingRow}>
              <label style={styles.label}>Geschäftsjahr anpassen (Startmonat)</label>
              <CustomSelect value={fiscalYearStart} onChange={setFiscalYearStart} options={monthOptions} />
            </div>

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
          </div>

          {/* SECCIÓN 3: BENUTZERPROFIL & ANMELDEDATEN (MODIFICADA) */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "12px" }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Benutzerprofil &amp; Anmeldedaten
            </h2>

            <div style={styles.settingRow}>
              <label style={styles.label}>Neue E-Mail-Adresse</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={styles.inputField} 
              />
            </div>

            <div style={styles.settingRow}>
              <label style={styles.label}>Neues Passwort</label>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={styles.inputField} 
                placeholder="Neues Passwort eingeben"
              />
              <div style={styles.checkboxContainer}>
                <input 
                  type="checkbox" 
                  id="togglePasswordVisibility"
                  checked={showPassword} 
                  onChange={() => setShowPassword(!showPassword)} 
                  style={styles.checkbox}
                />
                <label htmlFor="togglePasswordVisibility" style={styles.checkboxLabel}>Passwort anzeigen</label>
              </div>
            </div>

            <div style={styles.cardFooterButtonRow}>
              <button onClick={handleOpenModal} style={styles.switchOn}>
                Ändern
              </button>
            </div>
          </div>

        </div>

        {/* VISTA PREVIA EN VIVO */}
        <div style={styles.demoBox}>
          <h3 style={{ color: "#FFFFFF", marginTop: 0, fontSize: "16px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Live-Vorschau
          </h3>
          <div style={styles.demoFlex}>
            <div style={styles.demoItem}>
              <span style={styles.demoLabel}>Aktueller Kontostand:</span>
              <span style={styles.demoValue}>
                {(numberFormat === "Punkt" ? "45.250" : "45,250") + " " + getCurrencySymbol()}
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

      {/* --- POP-UP MODAL DE CONFIRMACIÓN (ESTILO CORPORATIVO) --- */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            {!isConfirmed ? (
              <>
                <p style={styles.modalText}>Sind Sie sicher, dass Sie diese Daten ändern möchten?</p>
                <div style={styles.modalButtonRow}>
                  <button onClick={handleCloseModal} style={styles.switchOff}>
                    Abbrechen
                  </button>
                  <button onClick={handleConfirmChanges} style={styles.switchOn}>
                    Bestätigen
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={styles.modalTextSuccess}>
                  Die Daten wurden geändert. Wir haben eine Bestätigungs-E-Mail an die neue Adresse gesendet.
                </p>
                <div style={styles.modalButtonRow}>
                  <button onClick={handleCloseModal} style={styles.switchOn}>
                    Schließen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  layoutWrapper: {
    display: "flex",
    height: "100vh", 
    width: "100vw",
    overflow: "hidden", 
  },
  mainContent: {
    flexGrow: 1,
    padding: "40px 60px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    height: "100vh", 
    overflowY: "auto", 
  },
  headerContainer: {
    marginBottom: "40px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    paddingBottom: "20px",
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: "36px",
    margin: 0,
    fontWeight: "700",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  subtitle: {
    color: "#8A9B9B",
    margin: "5px 0 0 0",
    fontSize: "16px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  gridContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.04)", 
    border: "1px solid rgba(46, 204, 113, 0.15)", 
    borderRadius: "12px",
    padding: "30px",
    flex: "1 1 450px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    color: "#2ECC71",
    fontSize: "20px",
    margin: "0 0 25px 0",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  inputField: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "6px",
    color: "#FFFFFF",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: "border-box",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
  },
  checkbox: {
    accentColor: "#2ECC71",
    cursor: "pointer",
    width: "16px",
    height: "16px",
    margin: 0,
  },
  checkboxLabel: {
    color: "#8A9B9B",
    fontSize: "13px",
    cursor: "pointer",
    userSelect: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  cardFooterButtonRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
    paddingTop: "10px",
  },
  customSelectTrigger: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "6px",
    color: "#FFFFFF",
    padding: "12px 14px",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  dropdownOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  dropdownListContainer: {
    position: "absolute",
    top: "105%",
    left: 0,
    right: 0,
    backgroundColor: "#121815", 
    border: "1px solid #2ECC71", 
    borderRadius: "6px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    zIndex: 100,
    maxHeight: "220px",
    overflowY: "auto",
  },
  dropdownItem: {
    padding: "12px 14px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  sliderLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  valueCritical: {
    color: "#f53420",
    fontWeight: "700",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  hintText: {
    color: "#8A9B9B",
    fontSize: "12px",
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  switchOff: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#8A9B9B",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.2s ease",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  demoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderLeft: "4px solid #2ECC71",
    padding: "20px 25px",
    borderRadius: "0 8px 8px 0",
    marginBottom: "20px",
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
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  demoValue: {
    color: "#FFFFFF",
    fontSize: "22px",
    fontWeight: "700",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  statusNormal: {
    color: "#2ECC71",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  statusCritical: {
    color: "#f53420",
    fontSize: "16px",
    fontWeight: "700",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#121815", 
    border: "2px solid #2ECC71", 
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "450px",
    width: "90%",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
    textAlign: "center",
  },
  modalText: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.5",
    margin: "0 0 25px 0",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalTextSuccess: {
    color: "#2ECC71",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.5",
    margin: "0 0 25px 0",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  modalButtonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
};