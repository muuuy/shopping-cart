import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/ItemBanner.module.scss";
import ArrowText from "../components/ArrowText";
import Explore from "../components/Explore";

import PokemonBanner from "../assets/itemBanner/pokemon_banner.webp";
import PokemonBanner2 from "../assets/itemBanner/pokemon_banner2.webp";
import PokemonBanner3 from "../assets/itemBanner/pokemon_banner3.webp";

const ItemBanner = () => {
  const [randNums, setRandNums] = useState([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const newRandNums = [];

      for (let i = 0; i < 4; i++) {
        let randomNumber;

        do {
          randomNumber = Math.floor(Math.random() * 500) + 1;
        } while (newRandNums.includes(randomNumber));

        newRandNums.push(randomNumber);
      }

      return newRandNums;
    };

    setRandNums(generateRandomNumbers());
  }, []);

  return (
    <div className={styles.itemBanner_container}>
      <div>
        <div className={styles.itemContainer_description}>
          <div>
            <ArrowText
              text={<h2 className={styles.item_header}>SHOP FOR ITEMS</h2>}
            />
          </div>
          <br></br>
          <p>
            Shop and discover items, ranging from Pokeballs to Techincal
            Machines!
          </p>
        </div>
        <div>
          {randNums.length > 0 &&
            randNums.map((num) => (
              <div className={styles.itemBanner_item} key={uuidv4()}>
                <Explore input={num} type="item" />
              </div>
            ))}
        </div>
      </div>
      <img src={PokemonBanner} className={styles.info_image} />
      <img src={PokemonBanner2} className={styles.info_image2} />
      <img src={PokemonBanner3} className={styles.info_image3} />
    </div>
  );
};

export default ItemBanner;
