import { useState, useEffect, useRef } from "react";

import Charizard from "../assets/banner/charizard.png";
import Dragapault from "../assets/banner/dragapault.png";
import Dragonite from "../assets/banner/dragonite.png";
import Salemence from "../assets/banner/salamence.png";

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
  return (
    <div className={styles.container}>
      <h1 id={styles.banner_header}>CATEGORIES TO EXPLORE</h1>
      <div>
        <BannerItem imgSrc={Charizard} category="POKEMON" />
        <BannerItem imgSrc={Dragonite} category="ITEMS" />
        <BannerItem imgSrc={Dragapault} category="BERRIES" />
        <BannerItem imgSrc={Salemence} category="TECHICAL MACHINES" />
      </div>
    </div>
  );
};

BannerItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Banner;
