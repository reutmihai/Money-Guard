import axios from "axios";

export const currencyApi = axios.create({
    baseURL: "https://openexchangerates.org/",
});