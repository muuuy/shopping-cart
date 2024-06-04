import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/Login.module.scss";

import LoginImage from "../assets/logIn/login_img.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error !== null) {
      setError(null);
    }

    setButtonLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/users/login/",
        formData
      );

      if (res.data.errors && res.data.errors.length > 0) {
        console.log(res.data.errors);
      } else {
        console.log("no errors");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className={styles.login_container}>
        <div style={styles.img_container}>
          <img src={LoginImage}></img>
        </div>
        <h1>Welcome Back!</h1>
        <p className={styles.description}>Good to see you again</p>
        {error}
        <form
          method="POST"
          className={styles.signup_form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="login-username">Username/Email:</label>
            <input
              type="text"
              placeholder="Username/Email"
              name="username"
              id="login-username"
              className={styles.login_input}
              autoComplete="username"
              required
              onChange={handleChange}
              minLength={2}
              maxLength={254}
              value={formData.username}
            ></input>
          </div>
          <div>
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="login-password"
              className={styles.login_input}
              autoComplete="password"
              required
              onChange={handleChange}
              minLength={8}
              maxLength={32}
              value={formData.password}
            ></input>
            <Link to="/signup" className={styles.forgot_password}>
              Forgot Password?
            </Link>
          </div>
          <button type="submit" disabled={buttonLoading}>
            Log In
          </button>
        </form>
        <p className={styles.sign_up}>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "var(--pastel-red)", fontWeight: 900 }}
          >
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
