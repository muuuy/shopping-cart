import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/ShopPokemon.module.scss";

import TypeCard from "../components/TypeCard";

import capitalize from "../utils/capitalize";

const PictureMenu = ({ sprites }) => {
  const populate = () => {
    const elements = [];
    const sprite_types = [
      "front_default",
      "back_default",
      "front_female",
      "back_female",
      "front_shiny",
      "back_shiny",
    ];

    sprite_types.forEach((type) => {
      if (sprites[type]) {
        elements.push(
          <img
            src={sprites[type]}
            className={styles.menu_sprite}
            key={uuidv4()}
          />
        );
      }
    });

    return <div className={styles.menu_container}>{elements}</div>;
  };

  return (
    <>
      {sprites && <div className={styles.picMenu_container}>{populate()}</div>}
    </>
  );
};

const ShopPokemon = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);
  const [types, setTypes] = useState(null);

  useEffect(() => {
    console.log("state", location.state.item);
    setPokemon(location.state.item);
  }, [location]);

  useEffect(() => {
    const populateTypes = () => {
      if (pokemon) {
        const typeNames = pokemon.types.map((type) => type.type.name);
        setTypes((prev) => typeNames);
      }
    };

    populateTypes();
  }, [pokemon]);

  return (
    <>
      {pokemon && types && (
        <div className="container">
          <div className={styles.shopPoke_container}>
            <PictureMenu sprites={pokemon.sprites} />
            <img
              src={pokemon.sprites.front_default}
              className={styles.poke_sprite}
            ></img>
            <div className={styles.description}>
              <h1>{capitalize(pokemon.name)}</h1>
              <h2>#{pokemon.id}</h2>
              <div>
                <TypeCard types={types} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

PictureMenu.propTypes = {
  sprites: PropTypes.object.isRequired,
};

export default ShopPokemon;
