import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from "../styles/Navbar.module.scss";

import Sidebar from "./Sidebar";
import SearchBar from "./Searchbar";
import ShoppingCart from "./ShoppingCart";
import User from "./User";

import { BsHurricane } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav_container}>
        <div className={styles.nav__sidebar}>
          <Sidebar />
        </div>
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
            <BsCart4 />
            <span>CART</span>
            <ShoppingCart />
          </li>
          <li className={`${styles.list_item} ${styles.arrow_container}`}>
            <User />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
