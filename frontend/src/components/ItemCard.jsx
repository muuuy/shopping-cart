import styles from "../styles/ItemCard.module.scss";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import capitalize from "../utils/capitalize";

//2159 TOTAL ITEMS

const ItemCard = ({ item }) => {
  return (
    <div className={styles.item_container}>
      <img
        src={item.sprites.default}
        className={styles.item_img}
        alt="Item"
        loading="lazy"
      />
      <div className={styles.item_desc}>
        <div className={styles.description_show}>
          <p className={styles.item_name}>{capitalize(item.name)}</p>
        </div>
        <div className={styles.description_hide}>
          <p className={styles.item_cost}>￥500.00</p>
          <Link
            to={`/shop-item/${item.name}`}
            state={{ item: item }}
            style={{ textDecoration: "none" }}
          >
            <button className={styles.buy_button}>BUY</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemCard;
