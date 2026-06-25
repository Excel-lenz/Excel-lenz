import { authFetch, authPost, authPatch, authDelete } from "../funcs";
import {PRODUCTS} from "../auth.jsx";

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

export const getProducts = async () => {
    const response = await authFetch(PRODUCTS);
    return await parseJsonOrThrow(response, "Failed to fetch products");
};

export const createProduct = async (data) => {
    const response = await authPost(PRODUCTS, data);
    return await parseJsonOrThrow(response, "Failed to create product");
};

export const updateProduct = async (id, data) => {
    const response = await authPatch(
        `${PRODUCTS}${id}/`,
        data
    );
    return await parseJsonOrThrow(response, "Failed to update product");
};

export const deleteProduct = async (id) => {
    const response = await authDelete(
        `${PRODUCTS}${id}/`
    );
    return await parseJsonOrThrow(response, "Failed to delete product");
};