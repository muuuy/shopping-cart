import { useState, useEffect } from "react";
import SpacerStyles from "../styles/Spacer.module.scss";
import styles from "../styles/PokemonBanner.module.scss";
import { v4 as uuidv4 } from "uuid";

import ArrowText from "../components/ArrowText";
import Explore from "../components/Explore";

import PokemonBannerImage from "../assets/pokemon_banner.webp";

const PokemonBanner = () => {
  const [randNums, setRandNums] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const newRandNums = [];

      for (let i = 0; i < 12; i++) {
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
        <ArrowText text={<h2>SHOP FOR POKEMON INFO</h2>} />
        <div className={styles.pokemon_container}>
          {randNums.length > 0 && <>{displayCards()}</>}
        </div>
      </div>
    </>
  );
};

export default PokemonBanner;
