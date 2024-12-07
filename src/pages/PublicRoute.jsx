import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import {Suspense} from "react";

const PublicRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? (
        <Navigate to="/Money-Guard/dashboard" />
    ) : (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    );
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default PublicRoute;
