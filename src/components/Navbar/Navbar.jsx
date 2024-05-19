import { useState, useEffect } from "react";

import styles from "./Navbar.module.css";

import { BsHurricane } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

const SearchBar = ({ setSearchValue }) => {
  const [outline, setOutline] = useState("1px solid black");
  const [input, setInput] = useState('');

  const addSearchBorder = () => {
    setOutline("1px solid var(--pastel-red)");
  };

  const removeSearchBorder = () => {
    setOutline("1px solid black");
  };

  const handleInput = (event) => {
    setInput((prev) => event.target.value);
    setSearchValue((prev) => event.target.value);
  }

  useEffect(() => {
    console.log(input);
  }, [input])

  return (
    <>
      <div className={styles.search_container} style={{ border: outline }}>
        <form className={styles.search}>
          <input
            type="text"
            id={styles.search_bar}
            value={input}
            onChange={handleInput}
            onFocus={addSearchBorder}
            onBlur={removeSearchBorder}
            placeholder="Search"
          ></input>
          <button type="submit" id={styles.search_button}>
            <BsSearch className={styles.search_icon} size={24} />
          </button>
        </form>
      </div>
    </>
  );
};

const Navbar = ({ setInput }) => {

  return (
    <>
      <nav className={styles.nav_container}>
        <a className={styles.logo}>
          <BsHurricane className={styles.logo_img} />
          POKE STOP
        </a>
        <SearchBar setSearchValue={setInput} />
        <ul className={styles.nav_list}>
          <li className={styles.list_item}>
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
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
