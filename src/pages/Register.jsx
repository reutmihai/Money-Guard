import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {handleRegister} from "../services/authAPI";
import "../assets/styles/Register.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

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

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        try {
            const resultAction = await dispatch(
                handleRegister({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                })
            ).unwrap();

            console.log("Registration successful:", resultAction);
            navigate("/Money-Guard/login", {replace: true});
        } catch (error) {
            console.error("Registration failed:", error);
            setErrors({email: "Înregistrarea a eșuat. Încearcă din nou."});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="input-container">
                                <label htmlFor="username">
                                    <i className="fa fa-user"></i>
                                </label>
                                <div className="column">
                                    <Field
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Name"
                                        className="register-input"
                                    />
                                    <ErrorMessage name="username" component="div" className="error"/>
                                </div>
                            </div>

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
                                        className="register-input"
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
                                        className="register-input"
                                    />
                                    <ErrorMessage name="password" component="div" className="error"/>
                                </div>
                            </div>

                            <div className="input-container">
                                <label htmlFor="confirmPassword">
                                    <i className="fa fa-lock"></i>
                                </label>
                                <div className="column">
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Confirm password"
                                        className="register-input"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="error"
                                    />
                                </div>
                            </div>

                            {error && <div className="error">{error}</div>} {/* Display server errors */}
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="register-button"
                            >
                                {isSubmitting || isLoading ? "Se încarcă..." : "Register"}
                            </button>
                            <button
                                type="button"
                                className="login-button"
                                onClick={() => navigate("/Money-Guard/login")}
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
