import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/Login.module.scss";
import UserFormStyles from "../styles/Userform.module.scss";

import LoginImage from "../assets/logIn/login_img.jpg";

import { useDispatch } from "react-redux";
import { authUser } from "../features/userSlice";

import { fetchItems } from "../utils/fetchItems";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
        formData,
        { withCredentials: true }
      );

      if (res.data.errors && res.data.errors.length > 0) {
        console.log(res.data.errors);
      } else {
        console.log("yoyoyoyoy", res.data.user);

        let cart;
        try {
          cart = await fetchItems(res.data.user.items);
        } catch (err) {
          console.log(err);
        }

        console.log(cart);

        dispatch(
          authUser({
            username: res.data.user.username,
            email: res.data.user.email,
            cart: cart,
            orders: res.data.user.orders,
          })
        );
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
        <div className={UserFormStyles.img_container}>
          <img src={LoginImage}></img>
        </div>
        <h1 className={UserFormStyles.form_header}>Welcome Back!</h1>
        <p className={UserFormStyles.description}>Good to see you again</p>
        {error}
        <form
          method="POST"
          className={UserFormStyles.user_form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="login-username">Username/Email:</label>
            <input
              type="text"
              placeholder="Username/Email"
              name="username"
              id="login-username"
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
              required
              onChange={handleChange}
              minLength={8}
              maxLength={32}
              value={formData.password}
            ></input>
            <Link to="/forget" className={styles.forgot_password}>
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={buttonLoading}
            className={styles.login_button}
          >
            Log In
          </button>
        </form>
        <p className={UserFormStyles.footer_text}>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "var(--pastel-red)",
              fontWeight: 900,
            }}
          >
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
