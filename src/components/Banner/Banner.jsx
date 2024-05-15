import electronic from "../../assets/banner/electronics.jpg";
import jewellery from "../../assets/banner/jewellry.jpg";
import mensClothing from "../../assets/banner/mens_clothing.jpg";
import womensClothing from "../../assets/banner/womens_clothing.jpg";

import PropTypes from 'prop-types';

import styles from "./Banner.module.css";

const BannerItem = ({ imgSrc, category }) => {
  return (
    <>
      <div className={styles.banner_container}>
        <img src={imgSrc} className={styles.banner_img}></img>
        <h2 className={styles.img_desc}>{category}</h2>
      </div>
    </>
  );
};

const Banner = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 id={styles.banner_header} style={{ margin: "32px", fontStyle: "italic", fontWeight: "900", textDecoration: 'underline' }}>
          CATEGORIES TO EXPLORE
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "4%",
          }}
        >
          <BannerItem imgSrc={electronic} category="Electronics" />
          <BannerItem imgSrc={jewellery} category="Jewellery" />
          <BannerItem imgSrc={mensClothing} category="Men&apos;s Clothing" />
          <BannerItem imgSrc={womensClothing} category="Women&apos;s Clothing" />
        </div>
      </div>
    </>
  );
};

BannerItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Banner;
