import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {handleLogIn} from "../services/authAPI";
import "../assets/styles/Login.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

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

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            await dispatch(handleLogIn(values)).unwrap();
            navigate("/Money-Guard/dashboard", {replace: true});
        } catch (error) {
            setErrors({email: "Email sau parolă incorectă"});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Log In</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="input-container">
                                <label htmlFor="email">
                                    <i className="fa fa-envelope"></i>
                                </label>
                                <div className="column">
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="E-mail"
                                        className="login-input"
                                    />
                                    <ErrorMessage name="email" component="div" className="error"/>
                                </div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="password">
                                    <i className="fa fa-lock"></i>
                                </label>
                                <div className="column">
                                    <Field
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className="login-input"
                                    />
                                    <ErrorMessage name="password" component="div" className="error"/>
                                </div>
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            <button type="submit" disabled={isSubmitting || isLoading} className="login-button">
                                {isSubmitting || isLoading ? "Loading..." : "Log In"}
                            </button>
                            <button
                                type="button"
                                className="register-button"
                                onClick={() => navigate("/Money-Guard/register")}
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
