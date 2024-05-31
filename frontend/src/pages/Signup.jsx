import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../styles/Signup.module.scss";

import SignupImage from "../assets/signUp/signup_img.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    email: "",
  });

  const [userError, setUserError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      setPassError(
        <p>
          The passwords you entered do not match. Please ensure both fields
          contain the same password and try again.
        </p>
      );
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/users/signup/",
          formData
        );
        console.log(res.data);
      } catch (err) {
        console.error("Problem submitting form:", err);
      }
    }
  };

  return (
    <div className="form-container">
      <div className={styles.signup_container}>
        <div className={styles.img_container}>
          <img src={SignupImage}></img>
        </div>
        <h1>Let&apos;s Get Started!</h1>
        <p className={styles.description}>Create an account to start shopping</p>
        {passError}
        <form
          method="POST"
          className={styles.signup_form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="signup-username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="signup-username"
              className={styles.signup_input}
              autoComplete="username"
              required
              onChange={handleChange}
              minLength={5}
              maxLength={15}
              value={formData.username}
            ></input>
          </div>
          <div>
            <label htmlFor="signup-password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="signup-password"
              className={styles.signup_input}
              autoComplete="off"
              required
              onChange={handleChange}
              minLength={8}
              maxLength={32}
              value={formData.password}
            ></input>
          </div>
          <div>
            <label htmlFor="signup-verify">Re-enter Password:</label>
            <input
              type="password"
              placeholder="Re-enter Password"
              name="verifyPassword"
              id="signup-verify"
              className={styles.signup_input}
              autoComplete="off"
              required
              onChange={handleChange}
              minLength={8}
              maxLength={32}
              value={formData.verifyPassword}
            ></input>
          </div>
          <div>
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="signup-email"
              className={styles.signup_input}
              autoComplete="email"
              required
              onChange={handleChange}
              minLength={2}
              maxLength={254}
              value={formData.email}
            ></input>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
