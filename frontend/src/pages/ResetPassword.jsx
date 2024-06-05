import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/ResetPassword.module.scss";

import ResetImage from "../assets/reset_password_img.jpg";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error != null) {
      setError(null);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/users/reset-password/",
        formData
      );

      if (res.data.errors && res.data.errors.length > 0) {
        setError(
          res.data.errors.map((err) => (
            <p key={uuidv4()} className={styles.error}>
              {err.msg}
            </p>
          ))
        );
      } else {
        console.log("no errors");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <div className={styles.reset_container}>
        <div className={styles.image_container}>
          <img src={ResetImage}></img>
        </div>
        <h1>Reset Your Password!</h1>
        <p></p>
        {error}
        <form
          method="POST"
          className={styles.reset_form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="reset-username">Username/Email:</label>
            <input
              type="username"
              placeholder="Username"
              name="username"
              id="reset-username"
              autoComplete="on"
              required
              onChange={handleChange}
              minLength={2}
              maxLength={254}
              value={formData.username}
            ></input>
          </div>
          <div>
            <label htmlFor="reset-password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="reset-password"
              autoComplete="off"
              required
              onChange={handleChange}
              minLength={8}
              maxLength={32}
              value={formData.password}
            ></input>
          </div>
          <div>
            <label htmlFor="reset-verify">Re-enter Password:</label>
            <input
              type="password"
              placeholder="Re-enter Password"
              name="verifyPassword"
              id="reset-verify"
              autoComplete="off"
              required
              onChange={handleChange}
              minLength={8}
              maxLength={32}
              value={formData.verifyPassword}
            ></input>
          </div>
          <button type="submit" disabled={buttonLoading}>
            Reset
          </button>
        </form>
      </div>
      {/* <p></p> */}
    </div>
  );
};

export default ResetPassword;
