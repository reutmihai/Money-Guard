import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../redux/selectors';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectLoggedIn);

  return isAuthenticated ? (
    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
  ) : (
    <Navigate to='/Money-Guard/login' />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
