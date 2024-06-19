const formatForSearch = (string) => {
  if (typeof string !== "string") {
    return string;
  }
  string = string.replace(/ /g, "-");
  return string.toLowerCase();
};

export default formatForSearch;
