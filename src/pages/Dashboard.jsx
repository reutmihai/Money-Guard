// import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogOut } from "../services/authAPI";
// import StatisticsPage from "./StatisticsPage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(handleLogOut())
      .unwrap()
      .then(() => {
        localStorage.removeItem("token");
        navigate("/Money-Guard/login", { replace: true });
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={handleLogout}>Log Out</button>
      {/* <StatisticsPage /> */}
    </div>
  );
};

export default Dashboard;
