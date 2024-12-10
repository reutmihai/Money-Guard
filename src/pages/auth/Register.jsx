import { useNotification } from "../../components/notification/notificationContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { handleRegister } from "../../services/authAPI";
import styles from "./auth.module.css";

const Register = () => {
  const { notify } = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLoading = useSelector((state) => state.auth.isLoading);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Password confirmation is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        handleRegister({
          username: values.username,
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      notify("Registration successful!");
      navigate("/login", { replace: true });
    } catch (error) {
      notify("Registration failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getProgressColor = (password) => {
    if (password.length < 6) return "red";
    if (password.length < 10) return "orange";
    return "green";
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.authCard}>
        <h2>Money Guard</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className={styles.inputContainer}>
                <label htmlFor="username">
                  <i className="fa fa-user"></i>
                </label>
                <div className="column">
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Name"
                    className={styles.registerInput}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className={styles.errorText}
                  />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="email">
                  <i className="fa fa-envelope"></i>
                </label>
                <div className="column">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    className={styles.registerInput}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorText}
                  />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="password">
                  <i className="fa fa-lock"></i>
                </label>
                <div className="column">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={styles.registerInput}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.showPasswordButton}
                  >
                    <i
                      className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                    ></i>
                  </button>
                  <div>
                    <div
                      className={styles.progressBar}
                      style={{
                        width: `${(values.password.length / 12) * 100}%`,
                        backgroundColor: getProgressColor(values.password),
                        height: "5px",
                        transition:
                          "width 0.5s ease-in-out, background-color 0.5s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.errorText}
                  />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="confirmPassword">
                  <i className="fa fa-lock"></i>
                </label>
                <div className="column">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    className={styles.registerInput}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={styles.showPasswordButton}
                  >
                    <i
                      className={
                        showConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"
                      }
                    ></i>
                  </button>

                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={styles.errorText}
                  />
                </div>
              </div>

              <div className={styles.loginButtonsWrapper}>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={styles.loginButton}
                >
                  {isSubmitting || isLoading ? "Loading..." : "Register"}
                </button>
                <button
                  type="button"
                  className={styles.registerButton}
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
