import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

import styles from "../styles/Pagination.module.scss";

const Pagination = ({
  postsPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  const totalPages = Math.ceil(length / postsPerPage);

  const paginationNums = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationNums.push(i);
  }

  const handleClick = (num) => {
    handlePagination(num);
  };

  const handleArrows = (num) => {
    if (currentPage + num < 1 || currentPage + num > totalPages) {
      return;
    }

    handlePagination(currentPage + num);
  };

  return (
    <div className={styles.pagination__container}>
      <BsChevronDoubleLeft onClick={() => handlePagination(1)} />
      <BsChevronLeft onClick={() => handleArrows(-1)} />
      {paginationNums.map((num) => (
        <button
          key={uuidv4()}
          className={
            currentPage === num
              ? `${styles.active} ${styles.button}`
              : styles.button
          }
          onClick={() => handleClick(num)}
        >
          {num}
        </button>
      ))}
      <BsChevronRight onClick={() => handleArrows(1)} />
      <BsChevronDoubleRight onClick={() => handlePagination(totalPages)} />
    </div>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
