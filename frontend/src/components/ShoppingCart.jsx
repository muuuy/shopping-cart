import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { cartRemove } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

import Checkout from "../pages/Checkout";

import styles from "../styles/Navbar.module.scss";

const ShoppingCart = () => {
  const username = useSelector((state) => state.user.username);
  const items = useSelector((state) => state.user.cart);

  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  const handlePopup = () => {
    if (items.length === 0) {
      console.log("No items in cart");
      return;
    }

    setShowPopup(!showPopup);
  };

  const handleClose = () => {
    setShowPopup(false);
  }

  const handleDelete = async (item) => {
    try {
      const res = await fetch(`http://localhost:3000/users/delete-item/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token: item.token, username: username }),
      });

      if (res.ok) {
        const updatedCart = items.filter((i) => i.token !== item.token);
        dispatch(cartRemove({ cart: updatedCart }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [totalCost, cartContent] = useMemo(() => {
    let totalCost = 0;

    let cart = items.map((item) => {
      totalCost += Number(item.cost);

      return (
        <div key={uuidv4()} className={styles.shopping_cart__item}>
          <Link
            to={`/shop-pokemon/${item.apiItem.name}`}
            state={{
              item: item.apiItem,
              cost: item.cost,
            }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {item.itemType === "pokemon" && (
              <img
                className={styles.item_image}
                src={item.apiItem.sprites.front_default}
              />
            )}
            {item.itemType === "item" && (
              <img
                className={styles.item_image}
                src={item.apiItem.sprites.default}
              />
            )}
            <div className={styles.cart_description}>
              <h2 className={styles.item_name}>{item.apiItem.name}</h2>
              <p className={styles.item_price}>￥{item.cost}</p>
              <p className={styles.item_quantity}>QTY: {item.quantity}</p>
            </div>
          </Link>
          <p
            className={styles.shopping_cart__delete}
            onClick={() => handleDelete(item)}
          >
            DELETE
          </p>
        </div>
      );
    });

    return [totalCost, cart];
  }, [items]);

  return (
    <div
      className={`${styles.dropdown} ${styles.cart}`}
      style={{
        display: showPopup ? "block" : "",
        animation: showPopup ? "none" : "",
      }}
    >
      <div className={styles.shopping_cart__content}>{cartContent}</div>
      <p className={styles.shopping_cart__cost}>
        <span>TOTAL:</span> ￥{totalCost}
      </p>
      <button className={styles.shopping_cart__checkout} onClick={handlePopup}>
        CHECKOUT
      </button>
      <div>
        <Checkout show={showPopup} onClose={handleClose} />
      </div>
    </div>
  );
};

export default ShoppingCart;
