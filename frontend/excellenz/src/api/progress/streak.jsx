import {authFetch} from "../funcs";
import {ME} from "../auth"


export const getStreak = async () => {
  const res = await authFetch(ME);

  if (!res.ok) {
    throw new Error("Failed to fetch capital");
  }

  return await res.json();
};
