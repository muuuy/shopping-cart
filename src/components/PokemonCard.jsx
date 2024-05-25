import { useState, useEffect } from "react";
import styles from "../styles/PokemonCard.module.scss";
import PropTypes from "prop-types";

import calculateCost from "../utils/calculateCost";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// 1025 Pokemon Total

const TypeCard = ({ types = [] }) => {
  const capitalizeWord = (string) => {
    if (typeof string !== "string") {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {types.length === 1 ? (
        <div className={styles.type_container}>
          <div className={styles[types[0]]}>{capitalizeWord(types[0])}</div>
        </div>
      ) : (
        <div className={styles.type_container}>
          <div className={styles[types[0]]}>{capitalizeWord(types[0])}</div>
          <div className={styles[types[1]]}>{capitalizeWord(types[1])}</div>
        </div>
      )}
    </>
  );
};

const PokemonCard = ({ pokemon }) => {
  const [types, setTypes] = useState([]);
  const exclude = ["Ho", "Chi", "Ting", "Chien", "Wo", "Porygon"];
  const excludeCapital = ["kommo", "hakamo", "jangmo"];
  const deleteWords = [
    "Basculin",
    "Zygarde",
    "Landorus",
    "Toxtricity",
    "Oricorio",
    "Eiscue",
    "Wormadam",
    "Meowstic",
    "Aegislash",
    "Urshifu",
    "Gourgeist",
    "Thundurus",
    "Indeedee",
    "Deoxys",
    "Darmanitan",
    "Meloetta",
    "Basculegion",
    "Wishiwashi",
  ];

  useEffect(() => {
    const populateTypes = () => {
      if (pokemon.types) {
        const typeNames = pokemon.types.map((type) => type.type.name);
        setTypes((prev) => typeNames);
      }
    };

    populateTypes();

    return () => {};
  }, [pokemon]);

  const capitalizeWord = (string) => {
    string = string.split("-");

    if (excludeCapital.includes(string[0])) {
      string[0] = string[0].charAt(0).toUpperCase() + string[0].slice(1);
      string = string.join("-");
      return string;
    }

    string = string.map((str) => str.charAt(0).toUpperCase() + str.slice(1));

    if (string[0] === "Mr") {
      return string.join(". ");
    } else if (exclude.includes(string[0])) {
      return string.join("-");
    } else if (deleteWords.includes(string[0])) {
      return string[0];
    }

    return string.join(" ");
  };

  return (
    <Link
      to={`/shop-pokemon/${pokemon.name}`}
      state={{ item: pokemon }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.pokemon_container}>
        <img
          className={styles.pokemon_img}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          loading="lazy"
        />
        <div className={styles.pokemon_desc}>
          <p className={styles.pokemon_id}>#{pokemon.id}</p>
          <p className={styles.pokemon_name}>{capitalizeWord(pokemon.name)}</p>
          <div>
            <TypeCard types={types} />
          </div>
          <p className={styles.pokemon_cost}>
            ￥{(Math.round(calculateCost(pokemon) * 100) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

TypeCard.propTypes = {
  types: PropTypes.array.isRequired,
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokemonCard;
