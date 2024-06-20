import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PropTypes from "prop-types";
import Explore from "../components/Explore";

import styles from "../styles/Explore.module.scss";

const ExploreFetch = ({
  page,
  itemsPerPage,
  totalNumberOfItems,
  itemType,
  leftOver = 0,
  startValue = 0,
}) => {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    const offset = (page - 1) * itemsPerPage;
    let numberOfItems = itemsPerPage;

    if (offset + itemsPerPage > totalNumberOfItems) {
      numberOfItems = leftOver;
    }

    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/${itemType}?limit=${numberOfItems}&offset=${
          offset + startValue
        }`
      );
      setItems(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [page, itemsPerPage, totalNumberOfItems, itemType, leftOver, startValue]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className={styles.explore__cards}>
      {items.map((item) => (
        <Explore key={uuidv4()} input={item.name} type={itemType} />
      ))}
    </div>
  );
};

ExploreFetch.propTypes = {
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalNumberOfItems: PropTypes.number.isRequired,
  itemType: PropTypes.string.isRequired,
  leftOver: PropTypes.number.isRequired,
  startValue: PropTypes.number.isRequired,
};

export default ExploreFetch;
