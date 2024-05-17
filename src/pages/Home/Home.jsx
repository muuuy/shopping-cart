import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Favicon from "react-favicon";

import Navbar from "../../components/Navbar/Navbar";
import SaleBanner from "../../components/SaleBanner/SaleBanner";
import Banner from "../../components/Banner/Banner";
import ItemCard from "../../components/ItemCard/ItemCard";

import controllers from "../../assets/infoBanner/game_controllers.jpg";

import styles from "./Home.module.css";

const InfoBanner = () => {
  return (
    <>
      <div className={styles.info_banner}>
        <div
          id={styles.info_image}
          style={{ backgroundImage: `url(${controllers})` }}
        ></div>

        <div className={styles.info_text}>
          <h1>DISCOVER, BUY, AND PLAY: YOUR ULTIMATE VIDEO GAME MARKETPLACE</h1>
          <div className={styles.sliver}></div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
            <br></br>
            <br></br>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <div id={styles.home_page}>
      <HelmetProvider>
        <Helmet>
          <title>BLACK MARKET</title>
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
      </div>
    </div>
  );
};

export default Home;
