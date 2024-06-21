import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import styles from "../styles/ShopPokemon.module.scss";

import CheckoutBanner from "../components/CheckoutBanner";
import CheckoutPopup from "../components/CheckoutPopup";

import ItemEffect from "../components/ItemEffect";
import ItemCategory from "../components/ItemCategory";

import capitalize from "../utils/capitalize";

const ShopItems = () => {
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [futureDate, setFutureDate] = useState(null);

  const popupRef = useRef();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setItem(location.state.item);

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 2);
    setFutureDate(futureDate);

    console.log(item);
  }, [location.state]);

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
  });

  return (
    <>
      {item && (
        <div className={styles.shop__container}>
          <div className={styles.shop__header}>
            <div className={styles.shop__header_image}>
              <img
                src={item.sprites.default}
                className={styles.shop__poke_sprite}
              />
              <div className={styles.shop__description}>
                <h1>{capitalize(item.name)}</h1>
                <h2>#{item.id}</h2>
                <div>
                  <ItemCategory category={item.category} />
                </div>
                <div className={styles.shop__description_info}>
                  <ItemEffect item={item} />
                </div>
              </div>
            </div>
            <div className={styles.shop__checkout_container}>
              <CheckoutBanner
                cost={item.cost}
                setShow={setShowPopup}
                date={futureDate}
                id={item.id}
                type="item"
              />
            </div>
          </div>
          {showPopup && (
            <div ref={popupRef} className={styles}>
              <CheckoutPopup
                item={item}
                shipDate={futureDate}
                cost={parseInt(item.cost)}
                pic={item.sprites.default}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopItems;