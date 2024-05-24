import styles from '../styles/SaleBanner.module.scss';

const SaleBanner = () => {
  const handleClick = () => {
    window.location.href = "/shopping-cart/src/pages/Shop/Shop.jsx";
  };

  return (
    <>
      <div className={styles.sales_container} onClick={handleClick}>
        <h1 className={styles.sales_topic}>Special Sale!</h1>
        <h2 className={styles.sales_desc}>Up to 30% Off</h2>
        <h3 className={styles.sales_link}>
          <a>Save Now</a>
          <span className={styles.arrow}>➢</span>
        </h3>
        <p className={styles.sales_disclaimer}>
          Participating shops only. Terms apply.
        </p>
      </div>
    </>
  );
};

export default SaleBanner;
