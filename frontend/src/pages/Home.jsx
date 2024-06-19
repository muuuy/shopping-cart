import PropTypes from "prop-types";
import styles from "../styles/Home.module.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRef } from "react";

import Banner from "../components/Banner";
import GreetingBanner from "../components/GreetingBanner";
import PokemonBanner from "../components/PokemonBanner";
import ItemBanner from "../components/ItemBanner";
import MiscBanner from "../components/MiscBanner";
import Explore from "../components/Explore";

const Home = ({ userInput, itemType }) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>POKE STOP | Home</title>
        </Helmet>
      </HelmetProvider>

      <div id={styles.home_page}>
        <section className={styles.component_container}>
          <GreetingBanner />
        </section>
        <section className="component-container">
          <Banner />
        </section>
        <section className="component-container">
          <PokemonBanner />
        </section>
        <section className="component-container">
          <ItemBanner />
        </section>
        <section className="component-container">
          <MiscBanner />
        </section>
        <section>
          <Explore input={userInput} type={itemType} />
        </section>
      </div>
    </>
  );
};

Home.propTypes = {
  userInput: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default Home;
