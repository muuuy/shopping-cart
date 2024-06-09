import { useRef } from 'react';

import styles from "../styles/ArrowText.module.scss";
import PropTypes from "prop-types";

const ArrowText = ({ text }) => {

  return (
    <div className={styles.arrow_container}>
      {text}
      <span className={styles.arrow}>➢</span>
    </div>
  );
};

ArrowText.propTypes = {
  text: PropTypes.element.isRequired,
};

export default ArrowText;
