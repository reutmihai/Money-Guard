// Auth selectors
export const selectUsername = (state) => state.auth.user.username;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectBalance = (state) => state.auth.balance;
export const selectId = (state) => state.auth.id;
export const selectUserToken = (state) => state.auth.token;
export const selectLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

//  Transaction selectors
export const selectTransactions = (state) => state.transactions.transactions;
export const selectTransactionCategories = (state) =>
  state.transactions.transactionCategories;
export const selectCategoriesSummary = (state) =>
  state.transactions.categoriesSummary;
export const selectIncomeSummary = (state) => state.transactions.incomeSummary;
export const selectExpenseSummary = (state) =>
  state.transactions.expenseSummary;
export const selectPeriodTotal = (state) => state.transactions.periodTotal;
export const selectYear = (state) => state.transactions.year;
export const selectMonth = (state) => state.transactions.month;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectTransactionError = (state) => state.transactions.error;

// Currency selectors
export const selectCurrencyData = (state) => state.currency.data;
export const selectCurrencyLoading = (state) => state.currency.isLoading;
export const selectCurrencyError = (state) => state.currency.error;
