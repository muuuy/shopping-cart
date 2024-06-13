import styles from "../styles/MiscBanner.module.scss";

import BerryBanner from "./BerryBanner";
import TMBanner from "./TMBanner";

const MiscBanner = () => {
  return (
    <div className={styles.misc_container}>
      <BerryBanner />
      <TMBanner />
    </div>
  );
};

export default MiscBanner;
