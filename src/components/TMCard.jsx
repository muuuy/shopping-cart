import styles from "../styles/ItemCard.module.scss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import capitalize from '../utils/capitalize';

const TMCard = ({ tm = null }) => {
    return (
        <div className={styles.tmCard_container}>

        </div>
    )
};

TMCard.propTypes = {
    tm: PropTypes.object.isRequired,
}

export default TMCard;