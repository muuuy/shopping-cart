import { useEffect } from "react";
import styles from "./PokemonCard.module.css";
import PropTypes from "prop-types";

const PokemonCard = ({ pokemon }) => {
  useEffect(() => {
    // Cleanup function if needed
    return () => {
      // Perform cleanup actions here if needed
    };
  }, []);

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
        <h1>{pokemon.name}</h1>
        <div>
          Types: {pokemon.types.map((type) => type.type.name).join(", ")}
        </div>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
};

export default PokemonCard;
