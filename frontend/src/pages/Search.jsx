import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import Explore from "../components/Explore";

const Search = ({}) => {
  const item = useSelector((state) => state.search.searchValue);
  const type = useSelector((state) => state.search.searchType);

  return (
    <div>
      <Explore input={item} type={type} />
    </div>
  );
};

// Search.propTypes = {
//   item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   type: PropTypes.string.isRequired,
// };

export default Search;
