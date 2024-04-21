import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <>
      <div className={styles.container}>
        <h1 style={{ zIndex: "1001", margin: '32px' }}>Test</h1>
        <div
          style={{
            display: "flex",
            flexAlign: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16%",
          }}
        >
          <div className={styles.banner_container}></div>
          <div className={styles.banner_container}></div>
          <div className={styles.banner_container}></div>
          <div className={styles.banner_container}></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
