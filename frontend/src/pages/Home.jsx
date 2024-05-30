import PropTypes from "prop-types";
import styles from "../styles/Home.module.scss";
import SpacerStyles from "../styles/Spacer.module.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

import SaleBanner from "../components/SaleBanner";
import Banner from "../components/Banner";
import InfoBanner from "../components/InfoBanner";
import PokemonBanner from "../components/PokemonBanner";
import ItemBanner from "../components/ItemBanner";
import BerryBanner from "../components/BerryBanner";
import TMBanner from "../components/TMBanner";
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
        <div className="container">
          <InfoBanner />
          <SaleBanner />
          <Banner />
          <PokemonBanner />
          <ItemBanner />
          <div className={`${SpacerStyles.spacer} ${SpacerStyles.layer2}`}>
            <div className={styles.grid_container}>
              <BerryBanner />
              <TMBanner />
            </div>
          </div>

          <Explore input={userInput} type={itemType} />
        </div>
      </div>
    </>
  );
};

Home.propTypes = {
  userInput: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default Home;
