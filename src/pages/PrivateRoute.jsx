import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../services/authContext.jsx";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? children : <Navigate to="/Money-Guard/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
