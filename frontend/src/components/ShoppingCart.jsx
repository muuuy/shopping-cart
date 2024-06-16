import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "../styles/Navbar.module.scss";

const ShoppingCart = () => {
  const items = useSelector((state) => state.user.cart);

  const cartContent = useMemo(() => {
    let totalCost = 0;

    let cart = items.map((item) => {
      totalCost += Number(item.cost);

      return (
        <div key={uuidv4()} className={styles.cart_item}>
          <img
            className={styles.item_image}
            src={item.apiItem.sprites.front_default}
          />
          <div className={styles.cart_description}>
            <h2 className={styles.item_name}>{item.apiItem.name}</h2>
            <p className={styles.item_price}>{item.cost}</p>
            <p className={styles.item_quantity}>{item.quantity}</p>
          </div>
        </div>
      );
    });

    cart.push(
      <div key={uuidv4()}>
        <p>Total Cost {totalCost}</p>
      </div>
    );

    return cart;
  }, [items]);

  return (
    <div className={`${styles.dropdown} ${styles.cart}`}>{cartContent}</div>
  );
};

export default ShoppingCart;
