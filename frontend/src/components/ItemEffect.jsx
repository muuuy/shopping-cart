import PropTypes from "prop-types";

import { useState, useEffect } from "react";

import styles from "../styles/ItemEffect.module.scss";

const ItemEffect = (item) => {
  const [description, setDescription] = useState(null);
  const [effect, setEffect] = useState(null);

  useEffect(() => {
    const desc = item.item.flavor_text_entries.find(
      (textLanguage) => textLanguage.language.name === "en"
    );
    setDescription(desc);

    const itemEffect = item.item.effect_entries.find(
      (textLanguage) => textLanguage.language.name === "en"
    );
    setEffect(itemEffect);
  }, [item]);

  return (
    <>
      {description && effect && (
        <div className={styles.description__container}>
          <div>
            <p>ITEM EFFECT</p>
            <p>{effect.effect}</p>
          </div>
          <div className={styles.description__description}>
            <p>ITEM DESCRIPTION</p>
            <p>{description.text}</p>
          </div>
        </div>
      )}
    </>
  );
};

ItemEffect.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemEffect;
