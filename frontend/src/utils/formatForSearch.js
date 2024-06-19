const formatForSearch = (string) => {
  if (typeof string !== "string") {
    throw new Error("Input must be a string.");
  }
  string = string.replace(/ /g, "-");
  return string.toLowerCase();
};

export default formatForSearch;
