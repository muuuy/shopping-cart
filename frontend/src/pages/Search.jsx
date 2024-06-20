import Explore from "../components/Explore";
import { useSearchParams } from "react-router-dom";

import formatForSearch from "../utils/formatForSearch";

import styles from "../styles/Search.module.scss";

const Search = () => {
  const [searchParams] = useSearchParams();

  const item = searchParams.get(`input`);
  const type = searchParams.get(`type`);

  return (
    <div className={styles.search__container}>
      <Explore input={formatForSearch(item)} type={type} />
    </div>
  );
};

export default Search;
