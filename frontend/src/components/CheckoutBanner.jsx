import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector } from "react-redux";

import styles from "../styles/CheckoutBanner.module.scss";

const CheckoutBanner = ({ cost = 0, setShow, date, id, type }) => {
  const quantity = useRef(null);
  const authentication = useSelector((state) => state.user.authenticated);

  const populateQuantity = () => {
    const options = [];

    for (let i = 1; i <= 30; i++) {
      options.push(
        <option value={i} key={uuidv4()}>
          {i}
        </option>
      );
    }

    return options;
  };

  const addToCart = async () => {
    if (authentication) {
      const jsonData = {
        cost: cost,
        quantity: quantity.current.value,
        id: id,
        type: type,
      };

      // const res = await fetch("http://localhost:3000/users/shopping-cart/", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: jsonData,
      // });

      const res = await axios.post(
        "http://localhost:3000/users/shopping-cart/",
        jsonData,
        { withCredentials: true }
      );
    } else {
      console.log("not auth");
      console.log(quantity.current.value);
    }
  };

  const showCheckout = () => {
    console.log("clicked");
    setShow(true);
  };

  return (
    <>
      {date !== null && (
        <div className={styles.checkout_container}>
          <p className={styles.cost}>
            <strong>￥{cost}</strong>
          </p>
          <p className={styles.free_text}>FREE Returns</p>
          <p className={styles.delivery_date}>
            FREE delivery{" "}
            <strong>
              {date.toLocaleDateString(undefined, {
                day: "2-digit",
                month: "long",
              })}
            </strong>
          </p>
          <p>Quantity:</p>
          <select
            className={styles.quantity_dropdown}
            id="pokemon-quantity"
            name="pokemon-quantity"
            ref={quantity}
          >
            {populateQuantity()}
          </select>
          <button className={styles.cart_button} onClick={addToCart}>
            Add to Cart
          </button>
          <button className={styles.buy_button} onClick={showCheckout}>
            Buy Now
          </button>
        </div>
      )}
    </>
  );
};

CheckoutBanner.propTypes = {
  cost: PropTypes.number.isRequired,
  setShow: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default CheckoutBanner;
