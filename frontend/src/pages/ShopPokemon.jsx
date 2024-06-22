import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import styles from "../styles/ShopPokemon.module.scss";

import TypeCard from "../components/TypeCard";
import PictureMenu from "../components/PictureMenu";
import CheckoutBanner from "../components/CheckoutBanner";
import CheckoutPopup from "../components/CheckoutPopup";

import PokemonStats from "../components/PokemonStats";
import PokemonAbilities from "../components/PokemonAbilities";

import capitalize from "../utils/capitalize";

const ShopPokemon = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);
  const [cost, setCost] = useState(null);
  const [types, setTypes] = useState(null);
  const [hoverImage, setHoveredImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [futureDate, setFutureDate] = useState(null);

  const popupRef = useRef();

  useEffect(() => {
    setPokemon(location.state.item);

    setCost(location.state.cost);

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 2); // Adding 2 days

    setFutureDate(futureDate);

    console.log(pokemon);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mosuedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleHover = (image) => {
    setHoveredImage(image);
  };

  return (
    <>
      {pokemon && types && (
        <div className={styles.shop__container}>
          <div className={styles.shop__header}>
            <div className={styles.shop__header_image}>
              <PictureMenu
                sprites={pokemon.sprites}
                handleHover={handleHover}
              />
              <img src={hoverImage} className={styles.shop__poke_sprite}></img>
              <div className={styles.shop__description}>
                <h1>{capitalize(pokemon.name)}</h1>
                <h2>#{pokemon.id}</h2>
                <div>
                  <TypeCard types={types} />
                </div>
                <div className={styles.shop__description_info}>
                  <PokemonStats stats={pokemon.stats} />
                  <PokemonAbilities abilities={pokemon.abilities} />
                </div>
              </div>
            </div>
            <div className={styles.shop__checkout_container}>
              <CheckoutBanner
                cost={parseInt(cost)}
                setShow={setShowPopup}
                date={futureDate}
                id={pokemon.id}
                type="pokemon"
              />
            </div>
          </div>
          {showPopup && (
            <div ref={popupRef} className={styles.shop__popup_container}>
              <CheckoutPopup
                item={pokemon}
                shipDate={futureDate}
                cost={parseInt(cost)}
                pic={pokemon.sprites.front_default}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopPokemon;
