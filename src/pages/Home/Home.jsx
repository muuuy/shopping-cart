import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import ArrowText from "../../components/ArrowText/ArrowText";
import SaleBanner from "../../components/SaleBanner/SaleBanner";
import Banner from "../../components/Banner/Banner";

import DragonPokemon from "../../assets/infoBanner/pokemon_info.jpg";

import styles from "./Home.module.scss";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import ItemCard from "../../components/ItemCard/ItemCard";

import itemBannerImage from "../../assets/itemBanner/pokemon_items.png";

const InfoBanner = () => {
  return (
    <>
      <div className={styles.info_banner}>
        <img
          rel="preload"
          loading="lazy"
          alt="Info Banner Image"
          src={DragonPokemon}
          id={styles.info_image}
        ></img>
        <div className={styles.info_text}>
          <h1>
            DISCOVER, BUY, AND BATTLE: YOUR ONE STOP SHOP FOR ALL POKEMON GOODS
          </h1>
          <div className={styles.sliver}></div>
          <p>
            Explore our extensive collection of essential items for trainers,
            featuring everything from berries to Poké Balls. We have it all to
            support your journey! Whether you&apos;re looking to stock up on
            vital supplies or gather crucial information, we&apos;ve got you
            covered.
            <br></br>
            <br></br>
            Discover detailed insights on Pokémon, including their habitats,
            evolutions, and more. Equip yourself with the best resources to
            become the ultimate Pokémon Master!
          </p>
        </div>
      </div>
    </>
  );
};

const Explore = ({ input = null, type = null }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!type) {
      console.error("Invalid type:", type);
      return;
    }

    if (input === null) {
      console.error("Invalid input:", input);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    if (type === "berry") {
      console.log("BERRURHAUIRHUIWAHRUIWA")
      fetch(`https://pokeapi.co/api/v2/item/${input}`, { signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${input} not found`);
          }
          return res.json();
        })
        .then((data) => {
          setItem(data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("cancelled!");
          } else {
            console.error(`Error fetching ${type}:`, err);
          }
        });
    } else {
      fetch(`https://pokeapi.co/api/v2/${type}/${input}`, { signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${input} not found`);
          }
          return res.json();
        })
        .then((data) => {
          setItem(data);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("cancelled!");
          } else {
            console.error(`Error fetching ${type}:`, err);
          }
        });
    }

    return () => {
      console.log("fetch cancelled!");
      controller.abort();
    };
  }, [input, type]);

  if (!item) {
    return null; // or loading indicator
  }

  return (
    <>
      {type === "pokemon" && <PokemonCard pokemon={item} />}
      {type === "item" && <ItemCard item={item} />}
      {type === "berry" && <ItemCard item={item} />}
    </>
  );
};

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

      console.log(newRandNums);
      return newRandNums;
    };

    setRandNums(generateRandomNumbers());
  }, []);

  return (
    <>
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
    </>
  );
};

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

      console.log(newRandNums);
      return newRandNums;
    };

    setRandNums(generateRandomNumbers());
  }, []);

  return (
    <>
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
    </>
  );
};

const Home = ({ userInput, itemType }) => {
  return (
    <div id={styles.home_page}>
      <div className="container">
        <InfoBanner />
        <SaleBanner />
        <Banner />
        <PokemonBanner />
        <ItemBanner />
        <Explore input={userInput} type={itemType} />
      </div>
    </div>
  );
};

Explore.propTypes = {
  input: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Home.propTypes = {
  userInput: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default Home;
