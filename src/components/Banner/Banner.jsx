import electronic from "../../assets/banner/electronics.jpg";
import jewellery from "../../assets/banner/jewellry.jpg";
import mensClothing from "../../assets/banner/mens_clothing.jpg";
import womensClothing from "../../assets/banner/womens_clothing.jpg";

import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 style={{ margin: "32px", fontStyle: 'italic', fontWeight: '500' }}>
          Categories to explore
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
          <div className={styles.banner_container}>
            <img src={electronic} className={styles.banner_img}></img>
            <h2 className={styles.img_desc}>Electornics</h2>
          </div>
          <div className={styles.banner_container}>
            <img src={jewellery} className={styles.banner_img}></img>
            <h2 className={styles.img_desc}>Jewellery</h2>
          </div>
          <div className={styles.banner_container}>
            <img src={mensClothing} className={styles.banner_img}></img>
            <h2 className={styles.img_desc}>Men&apos;s Clothing</h2>
          </div>
          <div className={styles.banner_container}>
            <img src={womensClothing} className={styles.banner_img}></img>
            <h2 className={styles.img_desc}>Women&apos;s Clothing</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
