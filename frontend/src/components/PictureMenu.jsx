import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/Shop.module.scss";

const PictureMenu = ({ sprites, handleHover }) => {
  const populate = () => {
    const sprite_types = [
      "front_default",
      "back_default",
      "front_female",
      "back_female",
      "front_shiny",
      "back_shiny",
    ];

    return sprite_types.map((type) => {
      if (sprites[type]) {
        return (
          <img
            src={sprites[type]}
            className={styles.menu_sprite}
            key={uuidv4()}
            onMouseEnter={() => handleHover(sprites[type])}
            onMouseLeave={() => handleHover(sprites.front_default)}
            alt={type}
          />
        );
      }
      return null;
    });
  };

  return <div className={styles.menu_container}>{sprites && populate()}</div>;
};

PictureMenu.propTypes = {
  sprites: PropTypes.object.isRequired,
  handleHover: PropTypes.func.isRequired,
};

export default PictureMenu;
