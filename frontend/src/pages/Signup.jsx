import { useState, useEffect } from "react";

import styles from "../styles/Signup.module.scss";

const Signup = () => {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const callAPI = () => {
      fetch("http://localhost:3000/orders")
        .then((res) => res.text())
        .then((res) => setApiResponse(res));
    };

    callAPI();
  }, []);

  return (
    <div>
      {apiResponse && (
        <div>
          <h1>Sign Up!</h1>
          <form method="POST" className={styles.signup_form}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="verify-password">Re-enter Password:</label>
              <input
                type="password"
                placeholder="Re-enter Password"
                name="verify-password"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
              ></input>
            </div>
          </form>
          <p>{apiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
