import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/finance/transactions/sales/";

const getAuthHeader = () => ({
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem("access")}`,
    },
});

export const getSales = async () => {

    const response = await axios.get(
        API_URL,
        getAuthHeader()
    );

    return response.data;
};