import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";

import OrderItemCards from "./OrderItemCards";

import styles from "../styles/OrderCards.module.scss";

const OrderCards = (order, items) => {
  const populateItemCards = useCallback(() => {
    // items.map((item) => {
    //   <OrderItemCards item={item} />;
    // });
  }, [items]);

  useEffect(() => {
    populateItemCards();
  }, [populateItemCards]);

  return (
    <div className={styles.order_cards__container}>
      <div className={styles.order_cards__header}>
        <p>{order.name}</p>
        <p>{order.country}</p>
        <p>{order.state}</p>
        <p>{order.zip}</p>
      </div>
    </div>
  );
};

OrderCards.propTypes = {
  order: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default OrderCards;
