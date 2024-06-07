import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/Forget.module.scss";
import UserFormStyles from "../styles/Userform.module.scss";

import ForgetImage from "../assets/forget_img.png";

const Forget = () => {
  const [formData, setFormData] = useState({ username: "" });
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

    setButtonLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/users/forget/",
        formData
      );

      if (res.data.errors && res.data.errors.length > 0) {
        setError(
          res.data.errors.map((error) => (
            <p key={uuidv4()} className={UserFormStyles.error}>
              {error.msg}
            </p>
          ))
        );
      } else {
        navigate("/");
        console.log("no errors");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className={styles.forget_container}>
        <div className={UserFormStyles.image_container}>
          <img src={ForgetImage}></img>
        </div>
        <h1>Forgot You Password?</h1>
        <p className={UserFormStyles.description}>
          We&apos;ll send you a link to your email so that you can
          <br></br>
          reset yourpassword.
        </p>
        {error}
        <form
          method="POST"
          className={UserFormStyles.user_form}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="forgot-input">Username/Email:</label>
            <input
              type="text"
              placeholder="Username/Email"
              name="username"
              id="forgot-input"
              autoComplete="username"
              required
              onChange={handleChange}
              minLength={2}
              maxLength={254}
              value={formData.username}
            ></input>
          </div>
          <button
            type="submit"
            disabled={buttonLoading}
            className={styles.forget_button}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forget;
