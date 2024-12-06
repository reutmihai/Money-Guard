import { createSlice } from '@reduxjs/toolkit';
import {
  getTransactions,
  addTransaction,
  removeTransaction,
  updateTransaction,
  getTransactionCategories,
  getTransactionsSummary,
} from '../../services/transactionsAPI';

const initialState = {
  transactions: [],
  transactionCategories: [],
  categoriesSummary: [],
  incomeSummary: null,
  expenseSummary: null,
  periodTotal: null,
  year: null,
  month: null,
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get all transactions
      .addCase(getTransactions.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Add a transaction
      .addCase(addTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
        state.error = null;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Remove a transaction
      .addCase(removeTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.transactions.findIndex(
          transaction => transaction.id === action.payload.id
        );
        state.transactions.splice(index, 1);
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update a transaction
      .addCase(updateTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.transactions.findIndex(
          transaction => transaction.id === action.payload.id
        );
        state.transactions.splice(index, 1, action.payload);
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Get transaction categories
      .addCase(getTransactionCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactionCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionCategories = action.payload;
        state.error = null;
      })
      .addCase(getTransactionCategories.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Getting transaction summaries
      .addCase(getTransactionsSummary.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactionsSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoriesSummary = action.payload.categoriesSummary;
        state.incomeSummary = action.payload.incomeSummary;
        state.expenseSummary = action.payload.expenseSummary;
        state.periodTotal = action.payload.periodTotal;
        state.year = action.payload.year;
        state.month = action.payload.month;
      })
      .addCase(getTransactionsSummary.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const transactionReducer = transactionsSlice.reducer;
