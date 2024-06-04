import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/Forgot.module.scss";

const Forget = () => {
  const [formData, setFormData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="form-container">
      <div className={StyleSheet.forget_container}>
        <h1>Forgot You Password?</h1>
        <form method="POST">
          <div>
            <label>Username/Email:</label>
            <input
              type="text"
              placeholder="Username/Email"
              className={styles}
              required
              autoComplete="username"
              name="username"
            ></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Forget;
