import { FORECAST } from "../auth";
import { authFetch } from "../funcs";

export const getForecast = async (scenario) => {
    const url = `${FORECAST}?scenario=${scenario}`;

    const res = await authFetch(url);

    if (!res.ok) {
        throw new Error("Failed to load forecast");
    }

    return await res.json();
};