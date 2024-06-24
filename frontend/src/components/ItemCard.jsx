import styles from "../styles/ItemCard.module.scss";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import capitalize from "../utils/capitalize";

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
          <p className={styles.item_cost}>
            {item.cost === 0 ? "UNAVALIABLE" : `￥${item.cost}`}
          </p>
          <Link
            to={`/shop/${item.name}`}
            state={{ item: item, isPokemon: false }}
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
