import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isAuthenticated }) => {
    return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default PublicRoute;
