import styles from "../styles/CheckoutPopup.module.scss";
import PropTypes from "prop-types";

import capitalize from "../utils/capitalize";

const CheckoutPopup = ({ item, shipDate, cost, pic }) => {
  return (
    <div className={styles.popup_container}>
      <p className={styles.header}>Buy now: {capitalize(item.name)}</p>
      <div className={styles.description}>
        <img src={pic}></img>
        <p>
          Arriving{" "}
          <span>
            {shipDate.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "long",
            })}
          </span>
        </p>
      </div>
      <p className={styles.cost}>
        <span>Total:</span>￥{cost}
      </p>
      <div className={styles.button_container}>
        <button className={styles.order_button}>Place your order</button>
      </div>
    </div>
  );
};

CheckoutPopup.propTypes = {
  item: PropTypes.object.isRequired,
  shipDate: PropTypes.object.isRequired,
  cost: PropTypes.number.isRequired,
  pic: PropTypes.string.isRequired,
};

export default CheckoutPopup;
