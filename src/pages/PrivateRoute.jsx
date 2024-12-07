import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import {Suspense} from "react";

const PrivateRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    ) : (
        <Navigate to="/Money-Guard/login" />
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
