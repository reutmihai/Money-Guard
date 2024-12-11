import { useNotification } from "../../components/notification/notificationContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { handleLogIn } from "../../services/authAPI";
import styles from "./auth.module.css";
import sprite from "../../assets/sprite.svg";

const Login = () => {
  const { notify } = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.auth.isLoading);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(handleLogIn(values)).unwrap();
      notify("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      notify("Incorrect email or password", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getProgressColor = (password) => {
    if (password === "correctpassword") return "green";
    if (password.length < 6) return "red";
    return "green";
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.authCard}>
        <div className={styles.logo}>
          <svg className={styles["icon-logo"]} width="50" height="50">
            <use xlinkHref={`${sprite}#icon-logo`} />
          </svg>
          <h2 className={styles.loginTitle}>Money Guard</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className={styles.inputContainer}>
                <label htmlFor="email">
                  <svg className={styles.icon}>
                    <use xlinkHref={`${sprite}#icon-email`} />
                  </svg>
                </label>
                <div className="column">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    className={styles.loginInput}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorText}
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <svg className={styles.icon}>
                  <use xlinkHref={`${sprite}#icon-lock`} />
                </svg>
                <div className="column">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={styles.loginInputPassword}
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
              <div className={styles.loginButtonsWrapper}>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={styles.loginButton}
                >
                  {isSubmitting || isLoading ? "Loading..." : "Log In"}
                </button>
                <button
                  type="button"
                  className={styles.registerButton}
                  onClick={() => navigate("/Money-Guard/register")}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
