import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import styles from "../styles/Shop.module.scss";

import TypeCard from "../components/TypeCard";
import PictureMenu from "../components/PictureMenu";
import CheckoutBanner from "../components/CheckoutBanner";
import CheckoutPopup from "../components/CheckoutPopup";

import PokemonStats from "../components/PokemonStats";
import PokemonAbilities from "../components/PokemonAbilities";

import ItemCategory from "../components/ItemCategory";
import ItemEffect from "../components/ItemEffect";

import capitalize from "../utils/capitalize";

const Shop = () => {
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [cost, setCost] = useState(null);
  const [types, setTypes] = useState(null);
  const [hoverImage, setHoveredImage] = useState(null);
  const [futureDate, setFutureDate] = useState(null);
  const [isPokemon, setIsPokemon] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    setItem(location.state.item);

    setCost(location.state.cost || location.state.item.cost);

    setIsPokemon(location.state.isPokemon);

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 2);
    setFutureDate(futureDate);
  }, [location, item]);

  useEffect(() => {
    if (isPokemon && item) {
      const typeNames = item.types.map((type) => type.type.name);
      setTypes(typeNames);
      setHoveredImage(item.sprites.front_default);
    }
  }, [item, isPokemon]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleHover = (image) => {
    setHoveredImage(image);
  };

  return (
    <>
      <div className={`overlay ${showPopup ? "active" : ""}`}></div>
      {item && (
        <div className={styles.shop__container}>
          <div className={styles.shop__header}>
            <div className={styles.shop__header_image}>
              {isPokemon ? (
                <>
                  <PictureMenu
                    sprites={item.sprites}
                    handleHover={handleHover}
                  />
                  <img src={hoverImage} className={styles.shop__sprite}></img>
                </>
              ) : (
                <img
                  src={item.sprites.default}
                  className={styles.shop__sprite}
                />
              )}
              <div className={styles.shop__description}>
                <h1>{capitalize(item.name)}</h1>
                <h2>#{item.id}</h2>
                <div>
                  {isPokemon && types && <TypeCard types={types} />}
                  {!isPokemon && <ItemCategory category={item.category} />}
                </div>
                <div className={styles.shop__description_info}>
                  {isPokemon ? (
                    <>
                      <PokemonStats stats={item.stats} />
                      <PokemonAbilities abilities={item.abilities} />
                    </>
                  ) : (
                    <ItemEffect item={item} />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.shop__checkout_container}>
              <CheckoutBanner
                cost={parseInt(cost)}
                setShow={setShowPopup}
                date={futureDate}
                id={item.id}
                type={isPokemon ? "pokemon" : "item"}
              />
            </div>
          </div>
          {showPopup && (
            <div ref={popupRef} className={styles.shop__popup_container}>
              <CheckoutPopup
                item={item}
                shipDate={futureDate}
                cost={parseInt(cost)}
                pic={
                  isPokemon ? item.sprites.front_default : item.sprites.default
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Shop;
