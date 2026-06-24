const DEFAULT_CURRENCY = "EUR";
const DEFAULT_LOCALE = "de-DE";

const toNumber = (value) => {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : 0;
};

export const normalizeCurrencySettings = (settings) => ({
  currency: settings?.currency || settings?.companyCurrency || DEFAULT_CURRENCY,
  locale: settings?.locale || DEFAULT_LOCALE,
});

export const formatCurrency = (value, settings, options = {}) => {
  const { currency, locale } = normalizeCurrencySettings(settings);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(toNumber(value));
};

export const formatNumber = (value, settings, options = {}) => {
  const { locale } = normalizeCurrencySettings(settings);

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(toNumber(value));
};

export const getCurrencySymbol = (settings) => {
  const { currency, locale } = normalizeCurrencySettings(settings);
  const currencyPart = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .formatToParts(0)
    .find((part) => part.type === "currency");

  return currencyPart?.value || currency;
};