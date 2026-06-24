import { authFetch, authPost, authPatch, authDelete } from "../funcs";
import { SALES } from "../auth.jsx";

const parseJsonOrThrow = async (response, fallbackMessage) => {
    const text = await response.text();
    let data = {};

    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = {};
        }
    }

    if (!response.ok) {
        const message = data?.detail || data?.message || fallbackMessage;
        throw new Error(message);
    }

    return data;
};

export const getSales = async () => {
    const response = await authFetch(SALES);
    const data = await parseJsonOrThrow(response, "Failed to fetch sales");

    if (!Array.isArray(data)) {
        return [];
    }

    return data.filter((item) => item?.type === "income");
};

export const createSale = async (data) => {
    const response = await authPost(SALES, data);
    return await parseJsonOrThrow(response, "Failed to create sale");
};

export const updateSale = async (id, data) => {
    const response = await authPatch(
        `${SALES}${id}/`,
        data
    );
    return await parseJsonOrThrow(response, "Failed to update sale");
};

export const deleteSale = async (id) => {
    const response = await authDelete(
        `${SALES}${id}/`
    );
    return await parseJsonOrThrow(response, "Failed to delete sale");
};