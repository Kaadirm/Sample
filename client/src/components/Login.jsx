import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, replace } from "formik";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../service/providers/AuthContext";

const Login = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { login } = useLogin();
  useEffect(() => {
    if (user !== null) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = (values) => {
    const { loggedInUser, error } = login({
      id: "1",
      username: values.name,
      password: values.password,
    });
    setErrorMessage(error);
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={{ name: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage
              className="error-message"
              name="name"
              component="div"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              className="error-message"
              name="password"
              component="div"
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
