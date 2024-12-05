import { createSlice } from '@reduxjs/toolkit';
import {
  handleLogIn,
  handleLogOut,
  handleRegister,
} from '../../services/authAPI';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { username: null, email: null },
    balance: null,
    id: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(handleRegister.pending, state => {
        state.isLoading = true;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.balance = action.payload.balance;
        state.id = action.payload.id;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(handleLogIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(handleLogIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.balance = action.payload.balance;
        state.id = action.payload.id;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(handleLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(handleLogOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(handleLogOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.balance = null;
        state.id = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(handleLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
