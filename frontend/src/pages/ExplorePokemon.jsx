import { useState } from "react";

import Pagination from "../components/Pagination";
import ExploreFetch from "../components/ExploreFetch";

import styles from "../styles/Explore.module.scss";

const ExplorePokemon = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalNumberOfItems = 1025;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.explore__container}>
      <h1 className={styles.explore__header}>EXPLORE POKEMON</h1>
      <ExploreFetch
        page={currentPage}
        itemsPerPage={itemsPerPage}
        totalNumberOfItems={totalNumberOfItems}
        itemType="pokemon"
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

export default ExplorePokemon;
