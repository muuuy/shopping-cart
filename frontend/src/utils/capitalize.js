// capitalize.js
const capitalize = (name) => {
  name = name.replace(/-/g, " ");
  const result = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return result;
};

export default capitalize;
