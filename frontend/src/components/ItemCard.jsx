import styles from "../styles/ItemCard.module.scss";
import PropTypes from "prop-types";

import capitalize from "../utils/capitalize";

//2159 TOTAL ITEMS

const ItemCard = ({ item }) => {
  return (
    <div className={styles.item_container}>
      <img
        src={item.sprites.default}
        className={styles.item_sprite}
        alt="Item"
        loading="lazy"
      ></img>
      <div className={styles.item_description}>
        <p className={styles.item_name}>{capitalize(item.name)}</p>
        <p className={styles.item_cost}>￥500.00</p>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemCard;
