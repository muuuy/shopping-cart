import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import Charizard from "../assets/banner/charizard.png";
import Dragapault from "../assets/banner/dragapault.png";
import Dragonite from "../assets/banner/dragonite.png";
import Salemence from "../assets/banner/salamence.png";

import Berries from "../assets/banner/berries.png";
import Pokeball from "../assets/banner/pokeball.png";
import Potion from "../assets/banner/potion.png";
import TM from "../assets/banner/tm.png";

import PropTypes from "prop-types";

import styles from "../styles/Banner.module.scss";

const BannerItem = ({ imgSrc, category }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const boundingRectangle = container.getBoundingClientRect();

    const mouseX = e.clientX - boundingRectangle.left;
    const mouseY = e.clientY - boundingRectangle.top;

    const rotateY =
      ((mouseX - boundingRectangle.width / 2) / boundingRectangle.width) * 45;
    const rotateX =
      ((boundingRectangle.height / 2 - mouseY) / boundingRectangle.height) * 45;

    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    container.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <>
      <div className={styles.banner_container}>
        <img
          src={imgSrc}
          className={styles.banner_img}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        ></img>
        <h2 className={styles.img_desc}>{category}</h2>
      </div>
    </>
  );
};

const Banner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const text = "CATEGORIES TO EXPLORE";

  return (
    <div className={styles.container}>
      <h1 id={styles.banner_header} ref={ref}>
        {text.split("").map((character, index) => (
          <span
            key={uuidv4()}
            className={`${styles.letters} ${inView ? styles.visible : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {character}
          </span>
        ))}
      </h1>
      <div className={styles.card_container}>
        <Link
          to={`/explore-pokemon/`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BannerItem imgSrc={Charizard} category="POKEMON" />
        </Link>
        <Link
          to={`/explore-items/`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BannerItem imgSrc={Dragonite} category="ITEMS" />
        </Link>
        <Link
          to={`/explore-berries/`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BannerItem imgSrc={Dragapault} category="BERRIES" />
        </Link>

        <BannerItem imgSrc={Salemence} category="TECHICAL MACHINES" />
      </div>
      <div className={styles.icon_container}>
        <img src={Pokeball}></img>
        <img src={Potion}></img>
        <img src={Berries}></img>
        <img src={TM}></img>
      </div>
    </div>
  );
};

BannerItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Banner;
