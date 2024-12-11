import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../redux/selectors';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectLoggedIn);

  return isAuthenticated ? (
    <Navigate to='/Money-Guard/' />
  ) : (
    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
  );
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
