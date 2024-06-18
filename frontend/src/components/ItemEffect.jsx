import PropTypes from "prop-types";

import { useState, useEffect } from "react";

import styles from "../styles/ItemEffect.module.scss";

const ItemEffect = (item) => {
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const desc = item.item.flavor_text_entries.find(
      (textLanguage) => textLanguage.language.name === "en"
    );

    setDescription(desc);
  }, [item]);

  return (
    <>
      {description && (
        <div>
          <div>{description.text}</div>
        </div>
      )}
    </>
  );
};

ItemEffect.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemEffect;
