import { useState, useEffect, useMemo } from "react";

import SaleBanner from "../../components/SaleBanner/SaleBanner";
import Banner from "../../components/Banner/Banner";

import DragonPokemon from "../../assets/infoBanner/pokemon_info.jpg";

import styles from "./Home.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

const InfoBanner = () => {
  return (
    <>
      <div className={styles.info_banner}>
        <img rel='preload' loading='lazy' alt='Info Banner Image' src={DragonPokemon} id={styles.info_image}></img>
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

const Explore = () => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://pokeapi.co/api/v2/pokemon/charizard", { signal })
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
      console.log("cancelled!");
      controller.abort();
    };
  }, []);

  return (
    <>
      {item !== null && (
        <PokemonCard pokemon={item} />
      )}
    </>
  );
};

const Home = () => {
  return (
    <div id={styles.home_page}>
      <div className="container">
      <InfoBanner />
        <SaleBanner />
        <Banner />
        <Explore />
      </div>
    </div>
  );
};

export default Home;
