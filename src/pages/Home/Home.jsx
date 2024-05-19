import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SaleBanner from "../../components/SaleBanner/SaleBanner";
import Banner from "../../components/Banner/Banner";

import DragonPokemon from "../../assets/infoBanner/pokemon_info.jpg";

import styles from "./Home.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

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

const Explore = ({ input = "" }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    console.log('explore component:', input);

    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("cancelled!");
        } else {
          console.log("error");
        }
      });

    return () => {
      console.log("fetch pokemon cancelled!");
      controller.abort();
    };
  }, [input]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  return <>{item !== null && <PokemonCard pokemon={item} />}</>;
};

const Home = ({ userInput }) => {

  useEffect(() => {
    console.log('homehomehome', userInput);
  }, [userInput]);

  return (
    <div id={styles.home_page}>
      <div className="container">
        <InfoBanner />
        <SaleBanner />
        <Banner />
        <Explore input={userInput} />
      </div>
    </div>
  );
};

Explore.propTypes = {
  input: PropTypes.string.isRequired,
};

Home.propTypes = {
  userInput: PropTypes.string.isRequired,
};

export default Home;
