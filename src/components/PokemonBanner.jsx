import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";

import ArrowText from "../components/ArrowText";
import Explore from "../components/Explore";

const PokemonBanner = () => {
  const [randNums, setRandNums] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const newRandNums = [];

      for (let i = 0; i < 5; i++) {
        let randomNumber;

        do {
          randomNumber = Math.floor(Math.random() * 1025) + 1;
        } while (newRandNums.includes(randomNumber));

        newRandNums.push(randomNumber);
      }

      return newRandNums;
    };

    setRandNums(generateRandomNumbers());
  }, []);

  return (
    <>
      <div className={`${styles.spacer} ${styles.layer1}`}>
        <div className={styles.pokeBanner_container}>
          <ArrowText text={<h2>Shop for Pokemon Info</h2>} />
          <div className={styles.pokemon_container}>
            {randNums.length > 0 && (
              <>
                <div className={styles.pokeBanner_item}>
                  <Explore input={randNums[0]} type="pokemon" />
                </div>
                <div className={styles.pokeBanner_item}>
                  <Explore input={randNums[1]} type="pokemon" />
                </div>
                <div className={styles.pokeBanner_item}>
                  <Explore input={randNums[2]} type="pokemon" />
                </div>
                <div className={styles.pokeBanner_item}>
                  <Explore input={randNums[3]} type="pokemon" />
                </div>
                <div className={styles.pokeBanner_item}>
                  <Explore input={randNums[4]} type="pokemon" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonBanner;
