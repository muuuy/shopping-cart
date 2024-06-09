import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import styles from "../styles/Navbar.module.scss";

import SearchBar from "./Searchbar";

import { BsHurricane } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

const Navbar = ({ setInput, setType }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); //SEND IN AS PROP TO LOGIN COMPONENT!!!!

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/login-info/");

        console.log("resresrishdfaiodjawiodjwaiodjwioajdiowa", res);

        if (res.data.user) {
          setUserInfo(res.data.user.username);
        } else {
          console.log("WHAT THE FUCK!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, [loggedIn]);

  return (
    <>
      <nav className={styles.nav_container}>
        <Link to="/" className={styles.logo} style={{ textDecoration: "none" }}>
          <BsHurricane className={styles.logo_img} />
          POKESTOP
        </Link>
        <SearchBar setSearchValue={setInput} setType={setType} />
        <ul className={styles.nav_list}>
          <li className={`${styles.list_item} ${styles.arrow_container}`}>
            <a className={styles.list_link} id={styles.shop_link}>
              <BsChevronDown size={16} className={styles.shop_arrow} />
              &nbsp;SHOP
            </a>
            <div className={styles.dropdown}>
              <a>Men&apos;s Clothing</a>
              <a>Women&apos;s Clothing</a>
              <a>Electronics</a>
              <a>Jewlery</a>
            </div>
          </li>
          <li className={styles.list_item} id={styles.shopping_cart}>
            <a>
              <BsCart4 />
            </a>
          </li>
          <li className={styles.list_item}>
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {userInfo ? `Welcome back ${userInfo}` : "SIGN IN"}&nbsp;
              <BsChevronDown size={16} className={styles.shop_arrow} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  setInput: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default Navbar;
