import {GOAL} from "../auth";
import { authFetch } from "../funcs";

export const getOverallGoal = async () => {
  const res = await authFetch(GOAL);

  if (!res.ok) {
    throw new Error("Failed to fetch capital");
  }

  return await res.json();
};
