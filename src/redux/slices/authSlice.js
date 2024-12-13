import { createSlice } from '@reduxjs/toolkit';
import {
  handleLogIn,
  handleLogOut,
  handleRegister,
} from '../../services/authAPI';
import { fetchUser } from '../../services/fetchUser';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { username: 'null', email: 'null' },
    balance: 0,
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
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.balance = action.payload.balance;
        state.id = action.payload.id;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        localStorage.setItem('token',state.token)
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(handleLogIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(handleLogIn.fulfilled, (state, action) => {
        state.user.username = action.payload.user.username;
        state.user.email = action.payload.user.email;
        state.balance = action.payload.balance;
        state.id = action.payload.id;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        localStorage.setItem('token',state.token)
      })
      .addCase(handleLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(handleLogOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(handleLogOut.fulfilled, state => {
        state.user = { username: null, email: null };
        state.balance = null;
        state.id = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        localStorage.removeItem('token');
      })
      .addCase(handleLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        state.balance = action.payload.balance;
        state.id = action.payload.id;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
