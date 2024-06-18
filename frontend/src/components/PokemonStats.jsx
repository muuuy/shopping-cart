import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import capitalize from "../utils/capitalize";

import styles from "../styles/PokemonStats.module.scss";

const PokemonStats = ({ stats }) => {
  const populateTypes = () => {
    return stats.map((stat) => (
      <div key={uuidv4()} className={`${styles.stats__item} ${styles[stat.stat.name]}`}>
        <p className={styles.stats__type}>{capitalize(stat.stat.name, true)}</p>
        <p style={{ color: "black" }}>{stat.base_stat}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className={styles.stats__container}>{populateTypes()}</div>
    </div>
  );
};

PokemonStats.propTypes = {
  stats: PropTypes.array.isRequired,
};

export default PokemonStats;
