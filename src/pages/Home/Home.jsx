import { useState, useEffect, useMemo } from "react";

import SaleBanner from "../../components/SaleBanner/SaleBanner";
import Banner from "../../components/Banner/Banner";
import ItemCard from "../../components/ItemCard/ItemCard";

import DragonPokemon from "../../assets/infoBanner/pokemon_info.jpg";

import styles from "./Home.module.css";

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
  //category, description, id, image, price, rating[rate, count], title
  const [item, setItem] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://fakestoreapi.com/products/2", { signal })
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

  const memoizedItem = useMemo(() => item, [item]);

  return (
    <>
      {item !== null && (
        <div className={styles.explore_container}>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
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
        <ItemCard />
        <Explore />
      </div>
    </div>
  );
};

export default Home;
