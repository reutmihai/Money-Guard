import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Setting the base url in axios
axios.defaults.baseURL = 'https://wallet.b.goit.study/api/auth';

// Adding token to authorization
const addAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Removing token from authorization
const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};


// Handling registration
export const handleRegister = createAsyncThunk(
  'auth/handleRegister',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/sign-up', data);
      addAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Handling login
export const handleLogIn = createAsyncThunk(
  'auth/handleLogIn',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/sign-in', userData);
      addAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Handling logout
export const handleLogOut = createAsyncThunk(
  'auth/handleLogOut',
  async (_, thunkAPI) => {
    try {
      await axios.delete('/sign-out');
      removeAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
