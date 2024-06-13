import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/BerryTMBanner.module.scss";

import ArrowText from "../components/ArrowText";
import Explore from "../components/Explore";

const TMBanner = () => {
  const [randNums, setRandNums] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const newRandNums = [];

      for (let i = 0; i < 4; i++) {
        let randomNumber;

        do {
          randomNumber = Math.floor(Math.random() * (396 - 305 + 1)) + 305;
        } while (newRandNums.includes(randomNumber));

        newRandNums.push(randomNumber);
      }

      return newRandNums;
    };

    setRandNums(generateRandomNumbers());
  }, []);

  return (
    <div className={styles.tmBanner_container}> 
      <div className={styles.tmBanner_header}>
        <p className={styles.explore}>Explore!</p>
        <ArrowText text={<h2 className={styles.tm_header}>SHOP FOR TECHNICAL MACHINES</h2>} />
      </div>
      <div className={styles.tmItem_container}>
        {randNums.length > 0 &&
          randNums.map((num) => (
            <div className={styles.tmBanner_item} key={uuidv4()}>
              <Explore input={num} type="item" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TMBanner;