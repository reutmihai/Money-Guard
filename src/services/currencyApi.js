import axios from "axios";

export const currencyApi = axios.create({
  baseURL: "https://openexchangerates.org/api/",
});

export async function getCurrencyRates() {
  const API_KEY = "a9965dc62ec24d6dae0ce3d397f4cf94";
  const localStorageKey = "currencyRates";
  const now = new Date();

  const cachedData = JSON.parse(localStorage.getItem(localStorageKey));
  if (cachedData) {
    const lastRequestTime = new Date(cachedData.timestamp);
    const differenceInHours = (now - lastRequestTime) / (1000 * 60 * 60);

    if (differenceInHours < 1) {
      return cachedData.rates;
    }
  }

  try {
    const response = await currencyApi.get(
      `/latest.json?app_id=${API_KEY}&symbols=USD,EUR`
    );

    const rates = response.data.rates;
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ rates, timestamp: now.toISOString() })
    );

    return rates;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw new Error("Unable to fetch currency rates");
  }
}
