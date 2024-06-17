import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import styles from "../styles/ShopPokemon.module.scss";

import CheckoutBanner from "../components/CheckoutBanner";
import CheckoutPopup from "../components/CheckoutPopup";

const ShopItems = () => {
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [futureDate, setFutureDate] = useState(null);

  const popupRef = useRef();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log(location.state);
    setItem(location.state.item);
    console.log("Item", item);

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 2);
    setFutureDate(futureDate);
  }, [location]);

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
              <img src={item.sprites.default} />
              <div className={styles.shop__description}>
                <h1>{item.name}</h1>
                <h2>#{item.id}</h2>
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
