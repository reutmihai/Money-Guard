import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {signUp} from "../services/authServices.jsx";
import '../assets/styles/Register.css';

const Register = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username-ul este obligatoriu"),
        email: Yup.string()
            .email("Adresa de email este invalidă")
            .required("Email-ul este obligatoriu"),
        password: Yup.string()
            .min(6, "Parola trebuie să conțină minim 6 caractere")
            .required("Parola este obligatorie"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Parolele nu se potrivesc")
            .required("Confirmarea parolei este obligatorie"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await signUp({ username: values.username,email: values.email, password: values.password });
            navigate("/login"); // Navighează către Log In
        } catch (error) {
            setErrors({ email: "Înredgistrarea a eșuat. Încearcă in nou." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <img src="../assets/images/logo.png" alt="Logo" className="register-logo"/>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="input-container">
                                <label htmlFor="username">
                                    <i className="fa fa-user"></i> {/* Icon for username */}
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Name"
                                    className="register-input"
                                />
                                <ErrorMessage name="username" component="div" className="error"/>
                            </div>

                            <div className="input-container">
                                <label htmlFor="email">
                                    <i className="fa fa-envelope"></i> {/* Icon for email */}
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="E-mail"
                                    className="register-input"
                                />
                                <ErrorMessage name="email" component="div" className="error"/>
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
                                    className="register-input"
                                />
                                <ErrorMessage name="password" component="div" className="error"/>
                            </div>

                            <div className="input-container">
                                <label htmlFor="confirmPassword">
                                    <i className="fa fa-lock"></i> {/* Icon for confirm password */}
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    className="register-input"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="error"/>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="register-button">
                                {isSubmitting ? "Se încarcă..." : "Register"}
                            </button>
                            <button
                                type="button"
                                className="login-button"
                                onClick={() => navigate('/Money-Guard/login')} // Redirecționează către login
                            >
                                Log In
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
