import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/Searchbar.module.scss";

import { BsSearch } from "react-icons/bs";

const SearchBar = ({ setSearchValue, setType }) => {
  const [outline, setOutline] = useState("1px solid black");
  const [input, setInput] = useState("");
  const options = [
    { value: "pokemon", label: "Pokemon" },
    { value: "item", label: "Items" },
    { value: "berry", label: "Berry" },
    { value: "machine", label: "TMs" },
  ];

  const [selectedType, setSelectedType] = useState(options[0].value);

  const handleChange = (event) => {
    setType(event.target.value);
    setSelectedType(event.target.value);
  };

  const addSearchBorder = () => {
    setOutline("1px solid var(--pastel-red)");
  };

  const removeSearchBorder = () => {
    setOutline("1px solid black");
  };

  const handleInput = (event) => {
    setInput((prev) => event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchValue(input.toLowerCase());
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <>
      <div className={styles.search_container} style={{ border: outline }}>
        <div className={styles.select_menu}>
          <select onChange={handleChange} value={selectedType}>
            {options.map((option) => (
              <option value={option.value} key={uuidv4()}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <form className={styles.search} onSubmit={handleSubmit}>
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

SearchBar.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default SearchBar;
