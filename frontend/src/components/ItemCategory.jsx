import PropTypes from "prop-types";

import capitalize from "../utils/capitalize";

import styles from "../styles/ItemCategory.module.scss";

const ItemCategory = ({ category }) => {
  return (
    <div className={styles.category__container}>
      {capitalize(category.name, true)}
    </div>
  );
};

ItemCategory.propTypes = {
  category: PropTypes.object.isRequired,
};

export default ItemCategory;
