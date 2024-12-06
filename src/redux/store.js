import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { authReducer } from "./slices/authSlice";
import { transactionReducer } from "./slices/transactionsSlice";
import { currencyReducer } from "./slices/currencySlice";

// Setting what data to save to local storage
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isLoggedIn", "user"],
};

const currencyPersistConfig = {
  key: "currency",
  storage,
  whitelist: ["data"],
};
// Configuring the store
 const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    transactions: transactionReducer,
    currency: persistReducer(currencyPersistConfig, currencyReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Exporting persistor state
export const persistor = persistStore(store);
export default store
