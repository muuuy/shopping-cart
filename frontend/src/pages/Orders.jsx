import styles from "../styles/Orders.module.scss";

import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.user.orders);

  return (
    <div className={styles.order__container}>
        <h1 className={styles.order__header}>YOUR ORDERS</h1>
      {orders.map((order) => {
        return order.map((item) => {
          return item.itemID;
        });
      })}
    </div>
  );
};

export default Orders;
