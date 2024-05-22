import styles from "./ItemCard.module.scss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

//2159 TOTAL ITEMS

const ItemCard = ({ item }) => {
  // useEffect(() => {

  // })

  return (
    <div className={styles.item_container}>
      <img
        src={item.sprites.default}
        className={styles.item_sprite}
        alt="Item"
        loading="lazy"
      ></img>
      <div className={styles.item_description}>
        <p className={styles.item_name}>{item.name.replace(/-/g, ' ')}</p>
        <p>￥500.00</p>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemCard;
