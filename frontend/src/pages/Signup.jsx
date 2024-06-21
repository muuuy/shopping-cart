import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/Signup.module.scss";
import UserFormStyles from "../styles/Userform.module.scss";

import SignupImage from "../assets/signUp/signup_img.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false); //Button can't be used while backend process happens

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error !== null) {
      setError(null);
    }

    if (formData.password !== formData.verifyPassword) {
      setError(
        <p className={styles.error}>The passwords you entered do not match.</p>
      );
    } else {
      setButtonLoading(true);

      try {
        const res = await axios.post(
          "http://localhost:3000/users/signup/",
          formData
        );

        if (res.data.errors && res.data.errors.length > 0) {
          setError(
            res.data.errors.map((err) => (
              <p key={uuidv4()} className={UserFormStyles.error}>
                {err.msg}
              </p>
            ))
          );
        } else {
          console.log("no errors");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setButtonLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <div className={styles.signup_container}>
        <div className={UserFormStyles.img_container}>
          <img src={SignupImage}></img>
        </div>
        <h1 className={UserFormStyles.form_header}>Let&apos;s Get Started!</h1>
        <p className={UserFormStyles.description}>
          Create an account to start shopping
        </p>
        {error}
        <form
          method="POST"
          className={UserFormStyles.user_form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="signup-username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="signup-username"
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
              autoComplete="email"
              required
              onChange={handleChange}
              minLength={2}
              maxLength={254}
              value={formData.email}
            ></input>
          </div>
          <button
            type="submit"
            disabled={buttonLoading}
            className={styles.signup_button}
          >
            Sign Up
          </button>
        </form>
        <p className={UserFormStyles.footer_text}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "var(--pastel-red)",
              fontWeight: 900,
            }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
