import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  return (
    <div>
      {paginationNums.map((num) => (
        <button
          key={uuidv4()}
          className={currentPage === num ? styles.active : ""}
          onClick={() => handleClick(num)}
        >
          {num}
        </button>
      ))}
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
