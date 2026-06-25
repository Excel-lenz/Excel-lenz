import { INVESTMENT } from "../auth";
import { authDelete, authFetch, authPost } from "../funcs";

export const getInvestments = async () => {
  const res = await authFetch(INVESTMENT);

  if (!res.ok) {
    throw new Error("Failed to fetch investments");
  }

  return await res.json();
};

export const createInvestment = async (data) => {
  const res = await authPost(INVESTMENT, data);

  if (!res.ok) {
    let errorMessage = "Failed to create investment";

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

export const deleteInvestment = async (id) => {
  const res = await authDelete(`${INVESTMENT}${id}/`);

  if (!res.ok) {
    throw new Error("Failed to delete investment");
  }

  return true;
};