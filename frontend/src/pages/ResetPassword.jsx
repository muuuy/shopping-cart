import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/ResetPassword.module.scss";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    verifyPassword: "",
  });
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className={styles.reset_container}>
        <div className={styles.image_container}>
          <img></img>
        </div>
        <h1></h1>
        <p></p>
        {error}
        <form
          method="POST"
          className={styles.reset_form}
          onSubmit={handleSubmit}
        >
          <div>
            <label></label>
            <input></input>
          </div>
          <div>
            <label></label>
            <input></input>
          </div>
          <div>
            <label></label>
            <input></input>
          </div>
          <button type="submit" disabled={buttonLoading}>Reset</button>
        </form>
      </div>
      {/* <p></p> */}
    </div>
  );
};

export default ResetPassword;
