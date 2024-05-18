import { useState, useEffect } from "react";
import styles from "./PokemonCard.module.css";
import PropTypes from "prop-types";

const TypeCard = ({ types = "none" }) => {

  const capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      {types.length === 1 ? (
        <div className={styles[types[0]]}>{capitalizeWord(types[0])}</div>
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

  useEffect(() => {
    const populateTypes = () => {
      const typeNames = pokemon.types.map((type) => type.type.name);
      setTypes(prev => typeNames);
    };

    populateTypes();

    return () => {
      // Perform cleanup actions here if needed
    };
  });

  const capitalizeWord = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
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
      </div>
    </div>
  );
};

TypeCard.propTypes = {
  types: PropTypes.array.isRequired,
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokemonCard;
