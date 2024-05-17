import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Favicon from "react-favicon";

import Navbar from "../../components/Navbar/Navbar";
import SaleBanner from "../../components/SaleBanner/SaleBanner";
import Banner from "../../components/Banner/Banner";
import ItemCard from "../../components/ItemCard/ItemCard";

import DragonPokemon from "../../assets/infoBanner/pokemon_info.jpg";

import styles from "./Home.module.css";

const InfoBanner = () => {
  return (
    <>
      <div className={styles.info_banner}>
        <div
          id={styles.info_image}
          style={{ backgroundImage: `url("${DragonPokemon}")` }}
        ></div>

        <div className={styles.info_text}>
          <h1>
            DISCOVER, BUY, AND BATTLE: YOUR ONE STOP SHOP FOR ALL POKEMON GOODS
          </h1>
          <div className={styles.sliver}></div>
          <p>
            Explore our extensive collection of essential items for trainers,
            featuring everything from berries to Poké Balls. We have it all to
            support your journey! Whether you&apos;re looking to stock up on vital
            supplies or gather crucial information, we&apos;ve got you covered.
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
    //MAX ID = 20
    // fetch('https://fakestoreapi.com/products/1')
    //         .then(res=>res.json())
    //         .then(json=>setItem(json))
    //         .catch(error=>console.log(error))
  }, []);

  return (
    <>
      {item !== null && (
        <div className={styles.explore_container}>
          <p>{item.description}</p>
          <img src={item.image} alt={item.description} />
          <p>{item.price}</p>
        </div>
      )}
    </>
  );
};

const Home = () => {
  return (
    <div id={styles.home_page}>
      <HelmetProvider>
        <Helmet>
          <title>POKE STOP</title>
        </Helmet>
      </HelmetProvider>

      <Favicon
        url={
          "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png"
        }
      />
      <Navbar />
      <InfoBanner />
      <div className="container">
        <SaleBanner />
        <Banner />
        <ItemCard />
        <Explore />
      </div>
    </div>
  );
};

export default Home;
