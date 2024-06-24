import PropTypes from "prop-types";

import capitalize from "../utils/capitalize";

import styles from "../styles/OrderItemCards.module.scss";

const OrderItemCards = ({ item }) => {
  return (
    <div className={styles.item__container}>
      <div className={styles.item__sprite}>
        {item.itemType === "pokemon" ? (
          <img src={item.apiItem.sprites.front_default} />
        ) : (
          <img src={item.apiItem.sprites.default} />
        )}
        <img />
      </div>
      <div className={styles.item__description}>
        <p>{capitalize(item.apiItem.name)}</p>
        <p>#{item.apiItem.id}</p>
        <p>
          <span>QUANTITY</span>: {item.quantity}
        </p>
        <p>
          <span>COST PER ITEM:</span> ￥{item.cost}
        </p>
      </div>
    </div>
  );
};

OrderItemCards.propTypes = {
  item: PropTypes.object.isRequired,
};

export default OrderItemCards;
