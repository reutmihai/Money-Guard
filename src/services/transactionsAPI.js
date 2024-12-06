import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "./apiClient";

// Adding a transaction
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post("/transactions", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Getting all transactions
export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/transactions");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Updating a transaction
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.patch(`/transactions/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Removing a transaction
export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Getting all the possible type of transactions
export const getTransactionCategories = createAsyncThunk(
  "transactions/getTransactionCategories",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/transactions-categories");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Getting the transaction summary

export const getTransactionsSummary = createAsyncThunk(
  "transactions/getTransactionSummary",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `/transactions-summary?month=${data.month}&year=${data.year}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
