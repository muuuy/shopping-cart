import styles from "../styles/Signup.module.scss";

const Signup = () => {
  return (
    <div>
      <h1>Sign Up!</h1>
      <form method="POST" className={styles.signup_form}>
        <div>
          <label htmlFor="username">Username:</label>
          <input name="username"></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password"></input>
        </div>
        <div>
          <label htmlFor="verify-password">Re-enter Password:</label>
          <input type="password" name="verify-password"></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email"></input>
        </div>
      </form>
    </div>
  );
};

export default Signup;
