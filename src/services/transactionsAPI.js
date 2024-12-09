import apiClient from "./apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await apiClient.patch(`/transactions/${id}`, data);
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
      const response = await apiClient.get("/transaction-categories");
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
      // console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      // console.error("Error fetching summary:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchUserBalance = createAsyncThunk(
  "auth/fetchUserBalance",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/user/balance");
      return response.data.balance;
    } catch (error) {
      console.error("Error fetching user balance:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
