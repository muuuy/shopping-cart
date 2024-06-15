import styles from "../styles/ShoppingCart.module.scss";

import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const items = useSelector((state) => state.user.cart);

  const populateCart = () => {
    return items.map((item) => (
      <>
        <div>
          <img className={styles.item_image} />
          <h2 className={styles.item_name}></h2>
          <p className={styles.item_price}></p>
          <p className={styles.item_quantity}></p>
        </div>
      </>
    ));
  };

  return <div>{populateCart}</div>;
};

export default ShoppingCart;
