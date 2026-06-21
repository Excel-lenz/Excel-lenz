import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/finance/products/";

const getAuthHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
    };
};

export const getProducts = async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
};

export const createProduct = async (data) => {
    const response = await axios.post(API_URL, data, getAuthHeader());
    return response.data;
};

export const updateProduct = async (id, data) => {
    const response = await axios.put(
        `${API_URL}${id}/`,
        data,
        getAuthHeader()
    );
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(
        `${API_URL}${id}/`,
        getAuthHeader()
    );
    return response.data;
};