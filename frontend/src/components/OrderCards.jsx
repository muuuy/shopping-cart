import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import OrderItemCards from "./OrderItemCards";
import { formatDate } from "../utils/formatDate";

import { BsChevronDown } from "react-icons/bs";

import styles from "../styles/OrderCards.module.scss";

const OrderCards = ({ order, items }) => {
  const calculateTotalCost = useMemo(() => {
    const total = items.reduce(
      (acc, item) => acc + item.cost * item.quantity,
      0
    );
    return total;
  }, [items]);

  const populateItemCards = useCallback(() => {
    return items.map((item) => <OrderItemCards key={uuidv4()} item={item} />);
  }, [items]);

  useEffect(() => {
    populateItemCards();
  }, [populateItemCards]);

  return (
    <>
      <div className={styles.order_cards__container}>
        <div className={styles.order_cards__header}>
          <div className={styles.order_cards__date}>
            <p className={styles.order_cards__header}>ORDER PLACED</p>
            <p>{formatDate(order.orderDate)}</p>
          </div>
          <div className={styles.order_cards__shipping}>
            <p className={styles.order_cards__header}>SHIP TO</p>
            <div className={styles.order_cards__user}>
              <p className={styles.order_cards__name}>
                {order.name} <BsChevronDown />
              </p>
              <div className={styles.order_cards__dropdown}>
                <p>{order.name}</p>
                <p>
                  {order.state}, {order.zip}
                </p>
                <p>{order.country}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.order_cards__items}>{populateItemCards()}</div>
        <p>
          <span>TOTAL COST:</span> ￥{calculateTotalCost}
        </p>
      </div>
    </>
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
