import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import styles from "../styles/Explore.module.scss";

import Explore from "../components/Explore";
import Pagination from "../components/Pagination";

const ExploreBerries = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalNumberOfItems = 63;

  const fetchItems = useCallback(async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    let numberOfItems = itemsPerPage;

    if (offset + itemsPerPage > totalNumberOfItems) {
      numberOfItems = 13;
    }

    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/item?limit=${numberOfItems}&offset=${126 + offset}`
      );
      setItems(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.explore__container}>
      <h1 className={styles.explore__header}>EXPLORE BERRIES</h1>
      <div className={styles.explore__cards}>
        {items.map((item) => (
          <Explore key={uuidv4()} input={item.name} type="item" />
        ))}
      </div>
      <div className={styles.explore__paginate}>
        <Pagination
          postsPerPage={itemsPerPage}
          length={totalNumberOfItems}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ExploreBerries;
