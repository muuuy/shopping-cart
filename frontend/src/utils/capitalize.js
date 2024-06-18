// capitalize.js
const capitalize = (toCapitalize, item = false) => {
  toCapitalize = toCapitalize.replace(/-/g, " ");
  let result;

  if (!item) {
    result = toCapitalize
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    result = toCapitalize.toUpperCase();
  }

  return result;
};

export default capitalize;
