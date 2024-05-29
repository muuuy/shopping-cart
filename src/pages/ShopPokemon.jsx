import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/ShopPokemon.module.scss";

import TypeCard from "../components/TypeCard";
import PictureMenu from "../components/PictureMenu";
import CheckoutBanner from "../components/CheckoutBanner";

import capitalize from "../utils/capitalize";

const ShopPokemon = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);
  const [cost, setCost] = useState(null);
  const [types, setTypes] = useState(null);
  const [hoverImage, setHoveredImage] = useState(null);

  useEffect(() => {
    console.log("state", location.state.item);
    setPokemon(location.state.item);

    setCost(location.state.cost);
  }, [location]);

  useEffect(() => {
    const populateTypes = () => {
      if (pokemon) {
        const typeNames = pokemon.types.map((type) => type.type.name);
        setTypes((prev) => typeNames);
        setHoveredImage(pokemon.sprites.front_default);
      }
    };
    populateTypes();
  }, [pokemon]);

  const handleHover = (image) => {
    setHoveredImage(image);
  };

  return (
    <>
      {pokemon && types && (
        <div className="container">
          <div className={styles.shopPoke_container}>
            <PictureMenu sprites={pokemon.sprites} handleHover={handleHover} />
            <img src={hoverImage} className={styles.poke_sprite}></img>
            <div className={styles.description}>
              <h1>{capitalize(pokemon.name)}</h1>
              <h2>#{pokemon.id}</h2>
              <div>
                <TypeCard types={types} />
              </div>
            </div>
            <div className={styles.checkout_container}>
              <CheckoutBanner cost={cost} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopPokemon;