

// Auth selectors
export const selectUsername = state => state.auth.user.username;
export const selectUserEmail = state => state.auth.user.email;
export const selectBalance = state => state.auth.balance;
export const selectId = state => state.auth.id;
export const selectUserToken = state => state.auth.token;
export const selectLoggedIn = state => state.auth.isLoggedIn;
export const selectLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.error;
