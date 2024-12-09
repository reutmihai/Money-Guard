import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./pages/PublicRoute.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import { useSelector } from "react-redux";
// import Home from "./pages/home/home.jsx";
// import MainOrganism from "./components/tranzaction/organism.jsx";
// import styles from "./assets/styles/index.css";

const Login = React.lazy(() => import("./pages/Login.jsx"));
const Register = React.lazy(() => import("./pages/Register.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
import StatisticsPage from "./pages/StatisticsPage.jsx";

// import StatisticsPage from "./pages/StatisticsPage.jsx";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/Money-Guard/login"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/Money-Guard/register"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Register />
              </PublicRoute>
            }
          />

          {/* Rută privată pentru Dashboard */}
          <Route
            path="/Money-Guard/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />

                <StatisticsPage />
              </PrivateRoute>
            }
          />

          {/* Redirect către /login by default */}
          <Route path="*" element={<Navigate to="/Money-Guard/login" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
