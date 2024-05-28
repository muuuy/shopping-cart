import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Home.module.scss";
import ArrowText from "../components/ArrowText";
import Explore from "../components/Explore";
import itemBannerImage from "../assets/itemBanner/pokemon_items.png";

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
          <p className={styles.explore}>Explore!</p>
          <ArrowText text={<h2>Shop for Items</h2>} />
          <br></br>
          <p>
            Shop and discover items, ranging from Pokeballs to Techincal
            Machines!
          </p>
        </div>
        {randNums.length > 0 &&
          randNums.map((num) => (
            <div className={styles.itemBanner_item} key={uuidv4()}>
              <Explore input={num} type="item" />
            </div>
          ))}
      </div>
      <img src={itemBannerImage} className={styles.info_image}></img>
    </div>
  );
};

export default ItemBanner;