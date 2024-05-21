import styles from './ItemCard.module.css';
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ItemCard = ({ item }) => {
  // useEffect(() => {

  // })

  return (
    <>
      <img src={item.sprites.default} className={styles.item_sprite} alt="Item"></img>
    </>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemCard;