import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "./components/notification/notificationContext.jsx";
import { useSelector } from "react-redux";
import PublicRoute from "./router/PublicRoute.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";
import TransactionList from "./components/tranzaction/lists/tranzaction-list.jsx";
import { selectLoading } from "./redux/selectors.js";
import "./assets/styles/index.css";

const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));
const Home = lazy(() => import("./pages/home/home.jsx"));
const StatisticsTab = lazy(() =>
  import("./components/statistic/statistic-tab.jsx/statistic-tab.jsx")
);

const App = () => {
  const isLoading = useSelector(selectLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/Money-Guard/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/Money-Guard/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Rută privată pentru Dashboard */}
          <Route
            path="/Money-Guard/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route path="" element={<TransactionList />} />
            <Route path="statistics" element={<StatisticsTab />} />
          </Route>

          {/* Redirect către /login by default */}
          <Route path="*" element={<Navigate to="/Money-Guard/login" />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;
