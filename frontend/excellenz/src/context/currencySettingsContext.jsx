import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSettings } from "../api/funcs.jsx";
import { normalizeCurrencySettings } from "../utils/currency.jsx";

const CurrencySettingsContext = createContext({
  currencySettings: normalizeCurrencySettings(),
  loadingCurrencySettings: false,
  refreshCurrencySettings: async () => normalizeCurrencySettings(),
  patchCurrencySettings: () => {},
});

export function CurrencySettingsProvider({ children }) {
  const [currencySettings, setCurrencySettings] = useState(() => normalizeCurrencySettings());
  const [loadingCurrencySettings, setLoadingCurrencySettings] = useState(false);

  const refreshCurrencySettings = useCallback(async () => {
    const hasToken = Boolean(localStorage.getItem("access") || localStorage.getItem("refresh"));

    if (!hasToken) {
      const fallback = normalizeCurrencySettings();
      setCurrencySettings(fallback);
      return fallback;
    }

    try {
      setLoadingCurrencySettings(true);
      const settings = await getSettings();
      const normalized = normalizeCurrencySettings(settings);
      setCurrencySettings(normalized);
      return normalized;
    } catch {
      const fallback = normalizeCurrencySettings();
      setCurrencySettings(fallback);
      return fallback;
    } finally {
      setLoadingCurrencySettings(false);
    }
  }, []);

  const patchCurrencySettings = useCallback((patch) => {
    setCurrencySettings((previous) => normalizeCurrencySettings({ ...previous, ...patch }));
  }, []);

  useEffect(() => {
    refreshCurrencySettings();
  }, [refreshCurrencySettings]);

  const value = useMemo(() => ({
    currencySettings,
    loadingCurrencySettings,
    refreshCurrencySettings,
    patchCurrencySettings,
  }), [currencySettings, loadingCurrencySettings, refreshCurrencySettings, patchCurrencySettings]);

  return (
    <CurrencySettingsContext.Provider value={value}>
      {children}
    </CurrencySettingsContext.Provider>
  );
}

export function useCurrencySettings() {
  return useContext(CurrencySettingsContext);
}
