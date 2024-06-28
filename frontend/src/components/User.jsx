import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../features/userSlice";

import styles from "../styles/Navbar.module.scss";

import { BsCaretDownFill } from "react-icons/bs";

const User = () => {
  const username = useSelector((state) => state.user.username);
  const auth = useSelector((state) => state.user.authenticated);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    if (!auth) {
      throw new Error("Not logged in.");
    } else {
      try {
        await axios.post("http://localhost:3000/users/logout/", null, {
          withCredentials: true,
        });

        dispatch(removeUser());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {username && (
        <>
          <div>
            <span className={styles.welcome_text}>WELCOME BACK</span>
            <br></br>
            {username.toUpperCase()}
            &nbsp;
            <BsCaretDownFill size={12} />
          </div>
          <div className={styles.dropdown}>
            <Link
              to={"/orders/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              ORDERS
            </Link>
            <button className={styles.log_out} onClick={handleLogOut}>
              LOG OUT
            </button>
          </div>
        </>
      )}
      {!username && (
        <>
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "inherit",
              fontSize: "20px",
            }}
          >
            SIGN IN&nbsp;
            <BsCaretDownFill size={12} />
          </Link>
          <div className={styles.dropdown}>
            <Link
              to={"/signup"}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              SIGN UP
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default User;
