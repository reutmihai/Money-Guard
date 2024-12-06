import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../services/authContext.jsx";

const Dashboard = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        if (logOut) {
            logOut();
        }

        navigate("/Money-Guard/login", { replace: true });
    };

    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Dashboard;