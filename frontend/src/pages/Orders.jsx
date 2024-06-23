import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { fetchOrderItem } from "../utils/fetchItems";

import styles from "../styles/Orders.module.scss";

const Orders = () => {
  const orders = useSelector((state) => state.user.orders);
  const [items, setItems] = useState([]);

  const populateItems = useCallback(async () => {
    console.log(orders);

    const apiOrders = await Promise.all(
      orders.map(async (order) => {
        const fetchedItems = await Promise.all(
          order.map(async (item) => {
            const fetchedItem = await fetchOrderItem(item);
            return fetchedItem;
          })
        );
        return fetchedItems;
      })
    );

    setItems([...apiOrders]);
  }, [orders]);

  useEffect(() => {
    populateItems();
  }, [populateItems]);

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  return (
    <div className={styles.order__container}>
      <h1 className={styles.order__header}>YOUR ORDERS</h1>
      {orders.map((order) => {
        return order.map((item) => {
          return (
            <div key={uuidv4()}>
              <p>{item.itemID}</p>
              <p>{item.itemType}</p>
              <p>{item.quantity}</p>
              <p>{item.cost}</p>
            </div>
          );
        });
      })}
    </div>
  );
};

export default Orders;
