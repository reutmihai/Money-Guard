import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {signIn} from "../services/authServices.jsx";
import '../assets/styles/Login.css';
import {AuthContext} from "../services/authContext.jsx";

const Login = () => {
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Adresa de email este invalidă")
            .required("Email-ul este obligatoriu"),
        password: Yup.string().required("Parola este obligatorie"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await signIn(values);
            logIn(response.token);
            navigate("/Money-Guard/dashboard", { replace: true });
        } catch (error) {
            setErrors({ email: "Email sau parolă incorectă" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/*<img src="../assets/images/logo.png" alt="Logo" className="login-logo"/>*/}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="input-container">
                                <label htmlFor="email">
                                    <i className="fa fa-envelope"></i> {/* Icon for email */}
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="E-mail"
                                    className="login-input"
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="password">
                                    <i className="fa fa-lock"></i> {/* Icon for password */}
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="login-input"
                                />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="login-button">
                                {isSubmitting ? "Loading..." : "Log In"}
                            </button>
                            <button
                                type="button"
                                className="register-button"
                                onClick={() => navigate('/Money-Guard/register')}
                            >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
