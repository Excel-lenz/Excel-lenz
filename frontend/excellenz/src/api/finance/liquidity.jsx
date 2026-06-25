import { LIQUIDITY_SUMMARY } from "../auth";
import { authFetch } from "../funcs";

const buildQuery = ({ startDate, endDate, category, type } = {}) => {
  const params = new URLSearchParams();

  if (startDate) params.set("start_date", startDate);
  if (endDate) params.set("end_date", endDate);
  if (category) params.set("category", category);
  if (type) params.set("type", type);

  const query = params.toString();
  return query ? `${LIQUIDITY_SUMMARY}?${query}` : LIQUIDITY_SUMMARY;
};

export const getLiquiditySummary = async (filters = {}) => {
  const res = await authFetch(buildQuery(filters));

  if (!res.ok) {
    throw new Error("Failed to fetch liquidity summary");
  }

  return await res.json();
};
