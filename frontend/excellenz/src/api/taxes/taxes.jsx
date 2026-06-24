import { API_BASE_URL, TAX_RESERVE } from "../auth";
import { authFetch, authPatch } from "../funcs";

export const getTaxSummary = async () => {
  const res = await authFetch(`${API_BASE_URL}/api/analytics/tax-summary/`);

  if (!res.ok) {
    throw new Error("Failed to fetch tax summary");
  }

  return await res.json();
};

export const updateTaxReserveRate = async (reserveRate) => {
  const res = await authPatch(TAX_RESERVE, {
    reserve_rate: reserveRate,
  });

  if (!res.ok) {
    throw new Error("Failed to save tax reserve rate");
  }

  const payload = await res.json();
  return {
    reserveRate: payload.reserve_rate,
  };
};