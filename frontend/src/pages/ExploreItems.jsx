import { useState } from "react";

import styles from "../styles/Explore.module.scss";

import Pagination from "../components/Pagination";
import ExploreFetch from "../components/ExploreFetch";

const ExploreItems = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalNumberOfItems = 954;
  const leftOver = 4;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.explore__container}>
      <h1 className={styles.explore__header}>EXPLORE ITEMS</h1>
      <ExploreFetch
        page={currentPage}
        itemsPerPage={itemsPerPage}
        totalNumberOfItems={totalNumberOfItems}
        itemType="item"
        leftOver={leftOver}
      />
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

export default ExploreItems;
