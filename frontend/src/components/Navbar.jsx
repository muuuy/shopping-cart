import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

import styles from "../styles/Navbar.module.scss";

import SearchBar from "./Searchbar";

import { BsHurricane } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";

const Navbar = ({ setInput, setType }) => {
  const username = useSelector((state) => state.user.username);

  return (
    <>
      <nav className={styles.nav_container}>
        <Link to="/" className={styles.logo} style={{ textDecoration: "none" }}>
          <BsHurricane className={styles.logo_img} />
          POKESTOP
        </Link>
        <div className={styles.search_container}>
          <SearchBar setSearchValue={setInput} setType={setType} />
        </div>
        <ul className={styles.nav_list}>
          <li className={`${styles.list_item} ${styles.arrow_container}`}>
            <a className={styles.list_link} id={styles.shop_link}>
              <BsChevronDown size={16} className={styles.shop_arrow} />
              &nbsp;SHOP
            </a>
            <div className={styles.dropdown}>
              <a>POKEMON</a>
              <a>ITEMS</a>
              <a>BERRIES</a>
              <a>TECHNICAL MACHINES</a>
            </div>
          </li>
          <li className={styles.list_item} id={styles.shopping_cart}>
            <a>
              <BsCart4 />
            </a>
          </li>
          <li className={`${styles.list_item} ${styles.arrow_container}`}>
            <a className={styles.list_link} id={styles.user_link}>
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  color: "inherit",

                  fontSize: "16px",
                }}
              >
                {username && (
                  <>
                    <span className={styles.welcome_text}>WELCOME BACK</span>
                    <br></br>
                    {username.toUpperCase()}
                  </>
                )}
                {!username && "SIGN IN"}
                &nbsp;
                <BsCaretDownFill size={12} />
              </Link>
            </a>
            <div className={styles.dropdown}>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                SIGN UP
              </Link>
            </div>
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
