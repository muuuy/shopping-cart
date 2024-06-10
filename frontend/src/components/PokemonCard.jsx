import { useState, useEffect } from "react";
import styles from "../styles/PokemonCard.module.scss";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TypeCard from "./TypeCard";

import calculateCost from "../utils/calculateCost";
// 1025 Pokemon Total

const PokemonCard = ({ pokemon }) => {
  const [types, setTypes] = useState([]);
  const [cost, setCost] = useState(0);

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
    "Morpeko",
    "Shaymin",
    "Mimikyu",
    "Tornadus",
  ];

  useEffect(() => {
    const populateTypes = () => {
      if (pokemon.types) {
        const typeNames = pokemon.types.map((type) => type.type.name);
        setTypes((prev) => typeNames);
        setCost((Math.round(calculateCost(pokemon) * 100) / 100).toFixed(2));
      }
    };

    populateTypes();
    console.log(pokemon);
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
    <div className={styles.pokemon_container}>
      <img
        className={styles.pokemon_img}
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        loading="lazy"
      />
      <div className={styles.pokemon_desc}>
        <div className={styles.description_show}>
          <p className={styles.pokemon_id}>#{pokemon.id}</p>
          <p className={styles.pokemon_name}>{capitalizeWord(pokemon.name)}</p>
        </div>
        <div className={styles.description_hide}>
          <div>
            <TypeCard types={types} />
          </div>
          <p className={styles.pokemon_cost}>￥{cost}</p>
          <Link
            to={`/shop-pokemon/${pokemon.name}`}
            state={{ item: pokemon, cost: cost }}
            style={{ textDecoration: "none" }}
          >
            <button className={styles.buy_button}>BUY</button>
          </Link>
        </div>
      </div>
      <div className={styles.circle}></div>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokemonCard;
