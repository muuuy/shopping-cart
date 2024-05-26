import PropTypes from "prop-types";

import styles from "../styles/TypeCard.module.scss";

const TypeCard = ({ types = [] }) => {
  const capitalizeWord = (string) => {
    if (typeof string !== "string") {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {types.length === 1 ? (
        <div className={styles.type_container}>
          <div className={styles[types[0]]}>{capitalizeWord(types[0])}</div>
        </div>
      ) : (
        <div className={styles.type_container}>
          <div className={styles[types[0]]}>{capitalizeWord(types[0])}</div>
          <div className={styles[types[1]]}>{capitalizeWord(types[1])}</div>
        </div>
      )}
    </>
  );
};

TypeCard.propTypes = {
  types: PropTypes.array.isRequired,
};

export default TypeCard;
