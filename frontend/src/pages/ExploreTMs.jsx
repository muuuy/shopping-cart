import { useState } from "react";

import ExploreFetch from "../components/ExploreFetch";
import Pagination from "../components/Pagination";

import styles from "../styles/Explore.module.scss";

const ExploreTMs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalNumberOfItems = 99;
  const startValue = 304;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.explore__container}>
      <h1 className={styles.explore__header}>EXPLORE TECHNICAL MACHINES</h1>
      <ExploreFetch
        page={currentPage}
        itemsPerPage={itemsPerPage}
        totalNumberOfItems={totalNumberOfItems}
        itemType="item"
        startValue={startValue}
      />
      <Pagination
        postsPerPage={itemsPerPage}
        length={totalNumberOfItems}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ExploreTMs;
