import PropTypes from "prop-types";

import styles from "../styles/OrderItemCards.module.scss";

const OrderItemCards = (item) => {
  return (
    <div className={styles.order_item_cards__container}>
      <div></div>
    </div>
  );
};

OrderItemCards.propTypes = {
  item: PropTypes.object.isRequired,
};

export default OrderItemCards;
