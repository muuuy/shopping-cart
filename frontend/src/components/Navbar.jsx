import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../features/userSlice";

import styles from "../styles/Navbar.module.scss";

import SearchBar from "./Searchbar";
import ShoppingCart from "./ShoppingCart";

import { BsHurricane } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";

const Navbar = () => {
  const username = useSelector((state) => state.user.username);
  const auth = useSelector((state) => state.user.authenticated);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    if (!auth) {
      throw new Error("Not logged in");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/users/logout/",
          null,
          {
            withCredentials: true,
          }
        ); //post to logout via backend
      } catch (error) {
        console.log(error);
      }

      dispatch(removeUser());
    }
  };

  return (
    <>
      <nav className={styles.nav_container}>
        <Link to="/" className={styles.logo} style={{ textDecoration: "none" }}>
          <BsHurricane className={styles.logo_img} />
          POKESTOP
        </Link>
        <div className={styles.search_container}>
          <SearchBar />
        </div>
        <ul className={styles.nav_list}>
          <li className={`${styles.list_item} ${styles.arrow_container}`}>
            <a className={styles.list_link} id={styles.shop_link}>
              <BsChevronDown size={16} className={styles.shop_arrow} />
              &nbsp;SHOP
            </a>
            <div className={styles.dropdown}>
              <Link
                to={"/explore-pokemon/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                POKEMON
              </Link>
              <Link
                to={`/explore-items/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                ITEMS
              </Link>
              <Link
                to={`/explore-berries/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                BERRIES
              </Link>
              <Link
                to={`/explore-tms/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                TECHNICAL MACHINES
              </Link>
            </div>
          </li>
          <li className={styles.list_item} id={styles.shopping_cart}>
            <BsCart4 /> CART
            <ShoppingCart />
          </li>
          <li className={`${styles.list_item} ${styles.arrow_container}`}>
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
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
