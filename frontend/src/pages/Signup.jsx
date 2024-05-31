import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../styles/Signup.module.scss";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/users/signup/", formData);
      console.log(res.data);
    } catch (err) {
      console.error("Problem submitting form:", err);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign Up!</h1>
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
              autoComplete="off"
              required
              onChange={handleChange}
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
              autoComplete="off"
              required
              onChange={handleChange}
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
              autoComplete="off"
              required
              onChange={handleChange}
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
              autoComplete="email"
              required
              onChange={handleChange}
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
