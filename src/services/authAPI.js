import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "./apiClient";

// Handling registration
export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (data, thunkAPI) => {
    try {
      const response = await apiClient.post("/auth/sign-up", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Handling login
export const handleLogIn = createAsyncThunk(
  "auth/handleLogIn",
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post("/auth/sign-in", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Handling logout
export const handleLogOut = createAsyncThunk(
  "auth/handleLogOut",
  async (_, thunkAPI) => {
    try {
      await apiClient.delete("/auth/sign-out");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
