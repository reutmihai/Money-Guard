import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicRoute from './router/PublicRoute.jsx';
import PrivateRoute from './router/PrivateRoute.jsx';
import Tranlist from './components/TranList/tranlist.jsx';

const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Home = lazy(() => import('./pages/home/Home.jsx'));

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
  const isLoading = useSelector(state => state.auth.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/Money-Guard/login'
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path='/Money-Guard/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Rută privată pentru Dashboard */}
        <Route
          path='/Money-Guard/'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }>
          <Route path='home' element={<Tranlist />} />
        </Route>

        {/* Redirect către /login by default */}
        <Route path='*' element={<Navigate to='/Money-Guard/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
