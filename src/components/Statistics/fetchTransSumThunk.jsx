import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetching transaction summary
export const fetchTransSumThunk = createAsyncThunk(
  'transactions/fetchTransSum',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(`/transactions/summary?month=${month}&year=${year}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
