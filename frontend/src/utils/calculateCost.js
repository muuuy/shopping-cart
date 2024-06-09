const calculateCost = (pokemon) => {
  if (pokemon) {
    return 5000.0 * pokemon.types.length;
  }
};

export default calculateCost;
