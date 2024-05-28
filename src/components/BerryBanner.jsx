import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/BerryTMBanner.module.scss";

import ArrowText from "../components/ArrowText";
import Explore from "../components/Explore";

const BerryBanner = () => {
  const [randNums, setRandNums] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const newRandNums = [];

      for (let i = 0; i < 4; i++) {
        let randomNumber;

        do {
          randomNumber = Math.floor(Math.random() * (189 - 126 + 1)) + 126;
        } while (newRandNums.includes(randomNumber));

        newRandNums.push(randomNumber);
      }

      return newRandNums;
    };

    setRandNums(generateRandomNumbers());
  }, []);

  return (
    <div className={styles.berryBanner_container}>
      <div className={styles.berryBanner_header}>
        <p className={styles.explore}>Explore!</p>
        <ArrowText text={<h2>Shop for Berries</h2>} />
      </div>
      <div className={styles.berryItem_container}>
        {randNums.length > 0 &&
          randNums.map((num) => (
            <div className={styles.berryBanner_item} key={uuidv4()}>
              <Explore input={num} type="item" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BerryBanner;
