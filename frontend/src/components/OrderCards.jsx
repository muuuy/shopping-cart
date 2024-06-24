import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";

import OrderItemCards from "./OrderItemCards";
import { formatDate } from "../features/formatDate";

import styles from "../styles/OrderCards.module.scss";

const OrderCards = ({ order, items }) => {
  const populateItemCards = useCallback(() => {
    return items.map((item) => {
      <OrderItemCards item={item} />;
    });
  }, [items]);

  useEffect(() => {
    populateItemCards();
  }, [populateItemCards]);

  return (
    <div className={styles.order_cards__container}>
      <div className={styles.order_cards__header}>
        <div className={styles.order_cards__date}>
          <p>ORDER PLACED</p>
          <p>{formatDate(order.orderDate)}</p>
        </div>

        <p>{order.name}</p>
        <p>{order.country}</p>
        <p>{order.state}</p>
        <p>{order.zip}</p>

        <p>{items[0].cost}</p>
      </div>
    </div>
  );
};

OrderCards.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.number,
    orderDate: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      apiItem: PropTypes.object,
      cost: PropTypes.number,
      itemType: PropTypes.string,
      quantity: PropTypes.number,
    })
  ).isRequired,
};

export default OrderCards;
