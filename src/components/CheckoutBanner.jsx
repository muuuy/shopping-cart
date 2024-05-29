import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import styles from "../styles/CheckoutBanner.module.scss";

const CheckoutBanner = ({ cost = 0, setShow, date }) => {
  const populateQuantity = () => {
    const options = [];

    for (let i = 1; i <= 30; i++) {
      options.push(<option value={i} key={uuidv4()}>{i}</option>);
    }

    return options;
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
          <select className={styles.quantity_dropdown}>
            {populateQuantity()}
          </select>
          <button className={styles.cart_button}>Add to Cart</button>
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
};

export default CheckoutBanner;
