import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const BASE_URL = 'https://wallet.b.goit.study/api/users/current';

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
