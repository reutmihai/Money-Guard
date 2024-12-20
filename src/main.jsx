import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";

import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
