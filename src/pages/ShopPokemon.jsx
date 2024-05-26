import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from '../styles/ShopPokemon.module.scss';

import capitalize from "../utils/capitalize";

const ShopPokemon = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    console.log("state", location.state.item);
    setPokemon(location.state.item);
  }, [location]);

  return (
    <>
      {pokemon && (
        <div className={styles.shopPoke_container}>
          <img src={pokemon.sprites.front_default} className={styles.poke_sprite}></img>
          <div>
            <h1>{capitalize(pokemon.name)}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopPokemon;
