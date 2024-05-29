import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "../styles/CheckoutBanner.module.scss";

const CheckoutBanner = ({ cost = 0 }) => {
  const [futureDate, setFutureDate] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 2); // Adding 2 days

    setFutureDate(futureDate);
  }, []);

  const populateQuantity = () => {
    const options = [];

    for (let i = 1; i <= 30; i++) {
      options.push(<option value={i}>{i}</option>);
    }

    return options;
  };

  return (
    <>
      {futureDate !== null && (
        <div className={styles.checkout_container}>
          <p className={styles.cost}>
            <strong>￥{cost}</strong>
          </p>
          <p className={styles.free_text}>FREE Returns</p>
          <p className={styles.delivery_date}>
            FREE delivery{" "}
            <strong>
              {futureDate.toLocaleDateString(undefined, {
                day: "2-digit",
                month: "long",
              })}
            </strong>
          </p>
          <p>Quantity:</p>
          <select className={styles.quantity_dropdown}>{populateQuantity()}</select>
          <button className={styles.cart_button}>Add to Cart</button>
          <button className={styles.buy_button}>Buy Now</button>
        </div>
      )}
    </>
  );
};

CheckoutBanner.propTypes = {
  cost: PropTypes.number.isRequired,
};

export default CheckoutBanner;
