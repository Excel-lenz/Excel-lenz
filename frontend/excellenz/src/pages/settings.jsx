import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar.jsx";
import { changePassword, getSettings, updateSettings } from "../api/funcs.jsx";
import { getCurrencySymbol } from "../utils/currency.jsx";
import { useCurrencySettings } from "../context/currencySettingsContext.jsx";
import "../styles/pages/dashboard.css";
import "../styles/pages/settings.css";

export default function Settings({
  sidebarOpen,
  setSidebarOpen,
  salesOpen,
  setSalesOpen,
  financeOpen,
  setFinanceOpen,
}) {
  const { currencySettings, patchCurrencySettings } = useCurrencySettings();
  const [language, setLanguage] = useState("Deutsch");
  const [currency, setCurrency] = useState("EUR");
  const [numberFormat, setNumberFormat] = useState("Punkt");
  const [popupsEnabled, setPopupsEnabled] = useState(true);
  const [fiscalYearStart, setFiscalYearStart] = useState("Januar");
  const [budgetWarning, setBudgetWarning] = useState(85);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveNotice, setSaveNotice] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await getSettings();
        setLanguage(data?.language ?? "Deutsch");
        setCurrency(data?.currency ?? "EUR");
        setNumberFormat(data?.numberFormat ?? "Punkt");
        setPopupsEnabled(Boolean(data?.popupsEnabled ?? true));
        setFiscalYearStart(data?.fiscalYearStart ?? "Januar");
        setBudgetWarning(Number(data?.budgetWarning ?? 85));
        setPrivacyMode(Boolean(data?.privacyMode ?? false));
        setError("");
      } catch (err) {
        console.error("Failed to load settings:", err);
        setError("Einstellungen konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSetting = async (key, value) => {
    try {
      await updateSettings({ [key]: value });

      if (key === "currency") {
        patchCurrencySettings({ currency: value });
      }

      setError("");
      setSaveNotice("Einstellung gespeichert.");
    } catch (err) {
      console.error(`Failed to update ${key}:`, err);
      setError("Einstellung konnte nicht gespeichert werden.");
      setSaveNotice("");
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Bitte alle Passwortfelder ausfuellen.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Neues Passwort muss mindestens 8 Zeichen haben.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Neues Passwort und Bestaetigung stimmen nicht ueberein.");
      return;
    }

    try {
      setPasswordLoading(true);
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Passwort erfolgreich geaendert.");
      setPasswordError("");
    } catch (err) {
      console.error("Failed to change password:", err);
      setPasswordError(err?.message || "Passwort konnte nicht geaendert werden.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const currencySymbol = getCurrencySymbol({ currency: currencySettings.currency, locale: currencySettings.locale });

  return (
    <div className="layout">
      <Topbar />
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        salesOpen={salesOpen}
        setSalesOpen={setSalesOpen}
        financeOpen={financeOpen}
        setFinanceOpen={setFinanceOpen}
      />

      <main className="main settings-main">
        <header className="header settings-header">
          <div>
            <h1 className="title">Einstellungen</h1>
            <p className="subtitle">Systemkonfiguration und Benutzeroberflaeche</p>
          </div>
        </header>

        {loading && <p className="settings-state">Einstellungen werden geladen...</p>}
        {error && <p className="settings-error">{error}</p>}
        {!loading && saveNotice && <p className="settings-success">{saveNotice}</p>}

        {!loading && (
          <>
            <section className="settings-grid">
              <article className="chartCard settings-card">
                <h2 className="settings-card-title">Anzeige und Benutzeroberflaeche</h2>

                <div className="settings-row">
                  <label className="settings-label" htmlFor="language">Systemsprache</label>
                  <select
                    id="language"
                    className="settings-select"
                    value={language}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLanguage(value);
                      updateSetting("language", value);
                    }}
                  >
                    <option value="Deutsch">Deutsch</option>
                    <option value="English">English</option>
                    <option value="Espanol">Espanol</option>
                  </select>
                </div>

                <div className="settings-row">
                  <label className="settings-label" htmlFor="currency">Standard-Waehrung</label>
                  <select
                    id="currency"
                    className="settings-select"
                    value={currency}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCurrency(value);
                      updateSetting("currency", value);
                    }}
                  >
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">US-Dollar (USD)</option>
                    <option value="CHF">Schweizer Franken (CHF)</option>
                  </select>
                </div>

                <div className="settings-row">
                  <label className="settings-label" htmlFor="numberFormat">Zahlenformat</label>
                  <select
                    id="numberFormat"
                    className="settings-select"
                    value={numberFormat}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNumberFormat(value);
                      updateSetting("numberFormat", value);
                    }}
                  >
                    <option value="Punkt">Punkt (10.000)</option>
                    <option value="Komma">Komma (10,000)</option>
                  </select>
                </div>

                <div className="settings-row-inline">
                  <label className="settings-label" htmlFor="popupsEnabled">System-Popups erlauben</label>
                  <button
                    id="popupsEnabled"
                    type="button"
                    className={`settings-toggle ${popupsEnabled ? "is-on" : "is-off"}`}
                    onClick={() => {
                      const value = !popupsEnabled;
                      setPopupsEnabled(value);
                      updateSetting("popupsEnabled", value);
                    }}
                  >
                    {popupsEnabled ? "JA" : "NEIN"}
                  </button>
                </div>
              </article>

              <article className="chartCard settings-card">
                <h2 className="settings-card-title">Finanzlogik und Sicherheit</h2>

                <div className="settings-row">
                  <label className="settings-label" htmlFor="fiscalYearStart">Geschaeftsjahr (Startmonat)</label>
                  <select
                    id="fiscalYearStart"
                    className="settings-select"
                    value={fiscalYearStart}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFiscalYearStart(value);
                      updateSetting("fiscalYearStart", value);
                    }}
                  >
                    <option value="Januar">Januar</option>
                    <option value="Februar">Februar</option>
                    <option value="Maerz">Maerz</option>
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

                <div className="settings-row">
                  <div className="settings-row-inline">
                    <label className="settings-label" htmlFor="budgetWarning">Budgetgrenzen-Warnung</label>
                    <span className={`settings-value ${budgetWarning > 85 ? "critical" : "normal"}`}>
                      {budgetWarning}%
                    </span>
                  </div>
                  <input
                    id="budgetWarning"
                    className="settings-slider"
                    type="range"
                    min="50"
                    max="100"
                    value={budgetWarning}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setBudgetWarning(value);
                      updateSetting("budgetWarning", value);
                    }}
                  />
                  <p className="settings-hint">Warnfarbe wird aktiviert, sobald der Wert ueber 85% liegt.</p>
                </div>

                <div className="settings-row-inline">
                  <div>
                    <p className="settings-label">Sicherheitsmodus (Privatsphaere)</p>
                    <p className="settings-hint">Blendet sensible Daten im Dashboard aus.</p>
                  </div>
                  <button
                    type="button"
                    className={`settings-toggle ${privacyMode ? "is-on" : "is-off"}`}
                    onClick={() => {
                      const value = !privacyMode;
                      setPrivacyMode(value);
                      updateSetting("privacyMode", value);
                    }}
                  >
                    {privacyMode ? "AKTIV" : "INAKTIV"}
                  </button>
                </div>
              </article>
            </section>

            <section className="progressSection settings-preview">
              <h3 className="settings-preview-title">Live-Vorschau (Einfluss auf das Dashboard)</h3>
              <div className="settings-preview-grid">
                <div>
                  <p className="settings-preview-label">Aktueller Saldo</p>
                  <p className="settings-preview-value">
                    {privacyMode
                      ? `*** ${currencySymbol}`
                      : `${numberFormat === "Punkt" ? "45.250,00" : "45,250.00"} ${currencySymbol}`}
                  </p>
                </div>
                <div>
                  <p className="settings-preview-label">Budget-Status</p>
                  <p className={`settings-status ${budgetWarning > 85 ? "critical" : "normal"}`}>
                    {budgetWarning > 85 ? "KRITISCH" : "NORMAL"}
                  </p>
                </div>
              </div>
            </section>

            <section className="progressSection settings-security">
              <h3 className="settings-preview-title">Passwort aendern / zuruecksetzen</h3>
              <p className="settings-hint">Aus Sicherheitsgruenden muss das aktuelle Passwort bestaetigt werden.</p>

              <form className="settings-password-form" onSubmit={handlePasswordSubmit}>
                <div className="settings-row">
                  <label className="settings-label" htmlFor="currentPassword">Aktuelles Passwort</label>
                  <input
                    id="currentPassword"
                    className="settings-input"
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="settings-row">
                  <label className="settings-label" htmlFor="newPassword">Neues Passwort</label>
                  <input
                    id="newPassword"
                    className="settings-input"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="settings-row">
                  <label className="settings-label" htmlFor="confirmPassword">Neues Passwort bestaetigen</label>
                  <input
                    id="confirmPassword"
                    className="settings-input"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {passwordError && <p className="settings-error settings-inline-msg">{passwordError}</p>}
                {passwordMessage && <p className="settings-success settings-inline-msg">{passwordMessage}</p>}

                <button className="settings-save-btn" type="submit" disabled={passwordLoading}>
                  {passwordLoading ? "Speichere..." : "Passwort aktualisieren"}
                </button>
              </form>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
