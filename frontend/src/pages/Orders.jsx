import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import OrderCards from "../components/OrderCards";

import { fetchOrderItem } from "../utils/fetchItems";

import styles from "../styles/Orders.module.scss";

const Orders = () => {
  const orders = useSelector((state) => state.user.orders);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const populateItems = useCallback(async () => {
    try {
      var apiOrders = await Promise.all(
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
    } catch (error) {
      console.log(error);
    }

    setItems([...apiOrders]);
    setLoading(false);
  }, [orders]);

  const createOrderCards = useMemo(() => {
    if (loading) return <p>Loading...</p>;
    else if (items.length === 0) return <p>No Orders Found.</p>;
    else {
      return orders.map((order, index) => {
        if (items[index] === undefined) {
          return;
        } else {
          return (
            <OrderCards key={uuidv4()} order={order} items={items[index]} />
          );
        }
      });
    }
  }, [orders, items, loading]);

  useEffect(() => {
    const fetchItems = async () => {
      await populateItems();
    };

    fetchItems().catch((error) => console.log(error));
  }, [populateItems]);

  return (
    <div className={styles.order__container}>
      <h1 className={styles.order__header}>YOUR ORDERS</h1>
      <div className={styles.order__cards}>{createOrderCards}</div>
    </div>
  );
};

export default Orders;
