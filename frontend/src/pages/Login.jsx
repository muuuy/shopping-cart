import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
    setFormData(...formData, { [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {};

  return (
    <div className="form-container">
      <div className={styles.login_container}>
        <div style={styles.img_container}>
          <img src={LoginImage}></img>
        </div>
        <h1>Welcome Back!</h1>
        <p className={styles.description}>Good to see you again</p>
        {error}
        <form method="POST" className={styles.signup_form}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className={styles.login_input}
              autoComplete="username"
              required
              onChange={handleChange}
              minLength={5}
              maxLength={15}
              value={formData.username}
            ></input>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="text"
              placeholder="Password"
              name="password"
              className={styles.login_input}
              autoComplete="password"
              required
              onChange={handleChange}
              minLength={8}
              maxLength={32}
              value={formData.password}
            ></input>
          </div>
          <button type="submit" disabled={buttonLoading}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
