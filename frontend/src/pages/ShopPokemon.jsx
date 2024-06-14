import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import styles from "../styles/ShopPokemon.module.scss";

import TypeCard from "../components/TypeCard";
import PictureMenu from "../components/PictureMenu";
import CheckoutBanner from "../components/CheckoutBanner";
import CheckoutPopup from "../components/CheckoutPopup";

import capitalize from "../utils/capitalize";

const ShopPokemon = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);
  const [cost, setCost] = useState(null);
  const [types, setTypes] = useState(null);
  const [hoverImage, setHoveredImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [futureDate, setFutureDate] = useState(null);

  const dispatch = useDispatch();

  const popupRef = useRef();

  useEffect(() => {
    console.log("state", location.state.item);
    setPokemon(location.state.item);

    setCost(location.state.cost);

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 2); // Adding 2 days

    setFutureDate(futureDate);
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
        <div className={styles.shopPoke_container}>
          <div className={styles.shop_header}>
            <div className={styles.header_image}>
              <PictureMenu
                sprites={pokemon.sprites}
                handleHover={handleHover}
              />
              <img src={hoverImage} className={styles.poke_sprite}></img>
              <div className={styles.description}>
                <h1>{capitalize(pokemon.name)}</h1>
                <h2>#{pokemon.id}</h2>
                <div>
                  <TypeCard types={types} />
                </div>
              </div>
            </div>
            <div className={styles.checkout_container}>
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
            <div ref={popupRef} className={styles.popup_container}>
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
