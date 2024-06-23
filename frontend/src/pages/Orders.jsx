import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import OrderCards from "../components/OrderCards";

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
          order.items.map(async (item) => {
            const fetchedItem = await fetchOrderItem(item);
            return fetchedItem;
          })
        );
        return fetchedItems;
      })
    );

    setItems([...apiOrders]);
  }, [orders]);

  const createOrderCards = useMemo(() => {
    return orders.map((order, index) => (
      <OrderCards key={uuidv4()} order={order} items={items[index]} />
    ));
  }, [orders, items]);

  useEffect(() => {
    populateItems();
  }, [populateItems]);

  useEffect(() => {
    console.log("items", items);
    console.log("items[0]", items[0]);
  }, [items]);

  return (
    <div className={styles.order__container}>
      <h1 className={styles.order__header}>YOUR ORDERS</h1>
      {items.length !== 0 ? createOrderCards : <p>No Orders found</p>}
    </div>
  );
};

export default Orders;
