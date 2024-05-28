import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import PokemonCard from "../components/PokemonCard";
import ItemCard from "../components/ItemCard";

const Explore = ({ input = null, type = null }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!type) {
      console.error("Invalid type:", type);
      return;
    }

    if (input === null) {
      console.error("Invalid input:", input);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://pokeapi.co/api/v2/${type}/${input}`, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${input} not found`);
        }
        return res.json();
      })
      .then((data) => {
        setItem(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("cancelled!");
        } else {
          console.error(`Error fetching ${type}:`, err);
        }
      });

    return () => {
      console.log("fetch cancelled!");
      controller.abort();
    };
  }, [input, type]);

  if (!item) {
    return null; // or loading indicator
  }

  return (
    <>
      {type === "pokemon" && <PokemonCard pokemon={item} />}
      {type === "item" && <ItemCard item={item} />}
      {type === "berry" && <ItemCard item={item} />}
      {type === "machine" && <ItemCard item={item} />}
    </>
  );
};

Explore.propTypes = {
  input: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Explore;