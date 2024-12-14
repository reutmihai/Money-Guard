import { lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/notification/notificationContext.jsx';
import { useSelector } from 'react-redux';
import PublicRoute from './router/PublicRoute.jsx';
import PrivateRoute from './router/PrivateRoute.jsx';
import TransactionList from './components/tranzaction/lists/tranzaction-list.jsx';
import { selectLoading } from './redux/selectors.js';
import './assets/styles/index.css';
import { usePageWidth } from './hooks/usePageWidth.jsx';

const Login = lazy(() => import('./pages/auth/Login.jsx'));
const Register = lazy(() => import('./pages/auth/Register.jsx'));
const StatisticsTab = lazy(() =>
  import('./components/statistic/statistic-tab.jsx/statistic-tab.jsx')
);
const Currency = lazy(() => import('./components/Currency/Currency.jsx'));

const App = () => {
  const isLoading = useSelector(selectLoading);

  // Getting the page width using a custom hook
  const pageWidth = usePageWidth();
  const [Home, setHome] = useState(lazy(() => import('./pages/home/home.jsx')));

  // Changing what the home renders depending on the page width
  useEffect(() => {
    if (pageWidth < 769) {
      setHome(lazy(() => import('./pages/home/mobileHome.jsx')));
    } else if (pageWidth >= 769 && window.innerWidth < 1200) {
      setHome(lazy(() => import('./pages/home/tabletHome.jsx')));
    } else {
      setHome(lazy(() => import('./pages/home/home.jsx')));
    }
  }, [pageWidth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/Money-Guard/login'
            element={
              <PublicRoute>
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
            <Route path='' element={<TransactionList />} />
            <Route path='statistics' element={<StatisticsTab />} />
            <Route path='currency' element={<Currency />} />
          </Route>

          {/* Redirect către /login by default */}
          <Route path='*' element={<Navigate to='/Money-Guard/login' />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;
