import { useEffect, useState } from "react";
import { fetchItems } from "../utils/fetchItems";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Explore from "../components/Explore";
import Pagination from "../components/Pagination";

import styles from "../styles/ExplorePokemon.module.scss";

const ExplorePokemon = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalNumberOfPokemon = 1025;

  useEffect(() => {
    const fetchItems = async () => {
      const offset = (currentPage - 1) * itemsPerPage;

      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
        );
        setItems(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.explore__container}>
      <h1 className={styles.explore__header}>EXPLORE POKEMON</h1>
      <div className={styles.explore__cards}>
        {items.map((item) => (
          <Explore key={uuidv4()} input={item.name} type="pokemon" />
        ))}
      </div>
      <div className={styles.explore__paginate}>
        <Pagination
          postsPerPage={itemsPerPage}
          length={totalNumberOfPokemon}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ExplorePokemon;
