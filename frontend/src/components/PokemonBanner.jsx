import { useState, useEffect } from "react";
import SpacerStyles from "../styles/Spacer.module.scss";
import styles from "../styles/PokemonBanner.module.scss";
import { v4 as uuidv4 } from "uuid";

import ArrowText from "../components/ArrowText";
import Explore from "../components/Explore";

const PokemonBanner = () => {
  const [randNums, setRandNums] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const newRandNums = [];

      for (let i = 0; i < 6; i++) {
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

  const displayCards = () => {
    return randNums.map((i) => (
      <Explore input={i} key={uuidv4} type="pokemon" />
    ));
  };

  return (
    <>
      <div className={styles.pokeBanner_container}>
        <div className={styles.pokeBanner_description}>
          <ArrowText
            text={
              <h2 className={styles.pokeBanner_header}>
                SHOP FOR POKEMON INFO
              </h2>
            }
          />
        </div>
        <section>
          <article className={styles.description}>
            Shop for information about Pokemon ranging from Caterpie to Arceus!
          </article>
          <div className={styles.pokemon_container}>
            {randNums.length > 0 && <>{displayCards()}</>}
          </div>
        </section>
      </div>
    </>
  );
};

export default PokemonBanner;
