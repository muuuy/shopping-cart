import { useInView } from "react-intersection-observer";

import styles from "../styles/GreetingBanner.module.scss";

import GreetingBannerImage from "../assets/GreetingBanner/GreetingBannerImage.webp";
import Dratini from "../assets/GreetingBanner/dratini.png";
import Meowth from "../assets/GreetingBanner/meowth.png";
import Pikachu from "../assets/GreetingBanner/pikachu.png";
import Charmander from "../assets/GreetingBanner/charmander.png";
import Squirtle from "../assets/GreetingBanner/squirtle.png";
import Bulbasaur from "../assets/GreetingBanner/bulbasaur.png";
import Pokeball from "../assets/GreetingBanner/pokeball.png";
import { BsChevronDown } from "react-icons/bs";

const GreetingBanner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={styles.banner_container}>
      <div className={styles.image_header}>
        <img src={Pokeball}></img>
        <img src={Pikachu}></img>
        <img src={Meowth}></img>
        <img src={Dratini}></img>
        <img src={Charmander}></img>
        <img src={Squirtle}></img>
        <img src={Bulbasaur}></img>
      </div>
      <div className={styles.image_container}>
        <img src={GreetingBannerImage} className={styles.banner_image}></img>
      </div>
      <div
        className={`${styles.banner_description} ${
          inView ? styles.visible : ""
        }`}
        ref={ref}
      >
        <h1>DISCOVER&emsp;BUY&emsp;BATTLE</h1>
        <h2>THE DESTINATION FOR ALL THINGS POKEMON.</h2>
      </div>
      <div className={styles.scroll_container}>
        <BsChevronDown className={styles.scroll_down} />
      </div>
    </div>
  );
};

export default GreetingBanner;
