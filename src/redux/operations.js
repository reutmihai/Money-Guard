import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencyRates } from "../services/currencyApi";

export const getCurrency = createAsyncThunk(
  "currency/getCurrency",
  async (_, thunkAPI) => {
    try {
      const rates = await getCurrencyRates();
      return {
        dollar: {
          rateBuy: rates.USD,
          rateSell: rates.USD,
        },
        euro: {
          rateBuy: rates.EUR,
          rateSell: rates.EUR,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
