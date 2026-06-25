import { COMPANY } from "./auth.jsx";
import { authFetch } from "./funcs.jsx";

export const getCompanySettings = async () => {
  const res = await authFetch(COMPANY);

  if (!res.ok) {
    throw new Error("Failed to fetch company settings");
  }

  const data = await res.json();
  const company = Array.isArray(data) ? data[0] : data;

  return {
    currency: company?.companyCurrency || "EUR",
    locale: "de-DE",
  };
};