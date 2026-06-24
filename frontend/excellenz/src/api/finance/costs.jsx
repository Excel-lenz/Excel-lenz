import { COST_ITEMS, COMPANY } from "../auth";
import { authDelete, authFetch, authPost, authPatch } from "../funcs";

export const getCostItems = async () => {
  const res = await authFetch(COST_ITEMS);

  if (!res.ok) {
    throw new Error("Failed to fetch cost items");
  }

  return await res.json();
};

export const getCompanyCurrency = async () => {
  const res = await authFetch(COMPANY);

  if (!res.ok) {
    throw new Error("Failed to fetch company");
  }

  const companies = await res.json();
  
  // The response is an array, get the first company or handle accordingly
  if (Array.isArray(companies) && companies.length > 0) {
    return companies[0].companyCurrency || "EUR";
  }
  
  return "EUR"; // fallback
};

export const createCostItem = async (data) => {
  const res = await authPost(COST_ITEMS, data);

  if (!res.ok) {
    let errorMessage = "Failed to create cost item";

    try {
      const payload = await res.json();

      if (payload?.detail) {
        errorMessage = payload.detail;
      } else if (typeof payload === "object" && payload !== null) {
        const firstValue = Object.values(payload)[0];
        if (Array.isArray(firstValue) && firstValue.length > 0) {
          errorMessage = String(firstValue[0]);
        }
      }
    } catch {
      // Keep fallback message if response body is not JSON.
    }

    throw new Error(errorMessage);
  }

  return await res.json();
};

export const updateCostItem = async (id, data) => {
  const res = await authPatch(`${COST_ITEMS}${id}/`, data);

  if (!res.ok) {
    let errorMessage = "Failed to update cost item";

    try {
      const payload = await res.json();

      if (payload?.detail) {
        errorMessage = payload.detail;
      } else if (typeof payload === "object" && payload !== null) {
        const firstValue = Object.values(payload)[0];
        if (Array.isArray(firstValue) && firstValue.length > 0) {
          errorMessage = String(firstValue[0]);
        }
      }
    } catch {
      // Keep fallback message if response body is not JSON.
    }

    throw new Error(errorMessage);
  }

  return await res.json();
};

export const deleteCostItem = async (id) => {
  const res = await authDelete(`${COST_ITEMS}${id}/`);

  if (!res.ok) {
    throw new Error("Failed to delete cost item");
  }

  return true;
};
