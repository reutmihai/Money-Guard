import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import PublicRoute from "./pages/PublicRoute.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import {fetchUser} from "./services/fetchUser.js";
import {useDispatch, useSelector} from "react-redux";
import {AuthProvider} from "./services/authContext.jsx";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Apelează fetchUser prin dispatch
                const action = await dispatch(fetchUser());
                if (action.meta.requestStatus === 'fulfilled') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rută publică pentru Log In */}
                    <Route
                        path="/Money-Guard/login"
                        element={
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <Login/>
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/Money-Guard/register"
                        element={
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <Register/>
                            </PublicRoute>
                        }
                    />

                    {/* Rută privată pentru Dashboard */}
                    <Route
                        path="/Money-Guard/dashboard"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Dashboard/>
                            </PrivateRoute>
                        }
                    />

                    {/* Redirect către /login by default */}
                    <Route path="*" element={<Navigate to="/Money-Guard/login"/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
