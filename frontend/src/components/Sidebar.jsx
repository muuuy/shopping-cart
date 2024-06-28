import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useRef } from "react";

import styles from "../styles/Navbar.module.scss";

import User from "./User";
import ShoppingCart from "./ShoppingCart";

import { BsList } from "react-icons/bs";

const Sidebar = () => {
  const dropdown = useRef(null);

  const handleClick = () => {
    if (dropdown.current.style.display === "flex")
      dropdown.current.style.display = "none";
    else dropdown.current.style.display = "flex";
  };

  return (
    <div className={styles.sidebar__container}>
      <BsList
        onClick={handleClick}
        size={28}
        className={styles.sidebar__burger}
      />
      <div className={styles.sidebar__dropdown} ref={dropdown}>
        <div className={styles.sidebar__dropdown_shop}>
          <p>SHOP</p>
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
        <div className={styles.sidebar__dropdown_user}>
          <User />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
