import {TRANSACTION} from "../auth"
import { authFetch, authPost } from "../funcs";

export const createTransaction = async (data) => {
  const res = await authPost(TRANSACTION, data)

  if (!res.ok) {
    throw new Error("Failed to create entry");
  }

  return await res.json();
};

export const getTransactions = async () => {
  const res = await authFetch(TRANSACTION);

  if (!res.ok) {
    throw new Error("Failed to fetch transaction");
  }

  return await res.json();
};