import { createSlice } from "@reduxjs/toolkit";
import { getCurrency } from "../operations";

const initialState = {
  data: null,
  isCurrencyLoading: false,
  isCurrencyError: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrency.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const currencyReducer = currencySlice.reducer;
