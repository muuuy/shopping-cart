import { useState } from "react";

import styles from "./Navbar.module.css";

import { BsSearch } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {
  const [letterVisible, setLetterVisible] = useState({});

  return (
    <>
      <nav className={styles.nav_container}>
        <a className={styles.logo}>Afterlife</a>
        <div className={styles.search_container}>
          <form className={styles.search}>
            <input type="text" id={styles.search_bar}></input>
            <button type="submit" id={styles.search_button}>
              <BsSearch />
            </button>
          </form>
        </div>
        
        <ul className={styles.nav_list}>
          <li className={styles.list_item}>
            <a className={styles.list_link}>Home</a>
          </li>
          <li className={styles.list_item}>
            <a className={styles.list_link}>Shop</a>
            <div className={styles.dropdown}>
              <a>Men&apos;s Clothing</a>
              <a>Women&apos;s Clothing</a>
              <a>Electronics</a>
              <a>Jewlery</a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
