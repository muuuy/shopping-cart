const { generateSessionItem } = require("../middleware/generateSessionItem");
const Item = require("../models/item");

const generateCartItemTokens = async (cart) => {
  const items = await Promise.all(
    cart.items.map((itemID) => Item.findById(itemID).exec())
  );
  const responseItems = items.map((item) => {
    return generateSessionItem(item);
  });

  return responseItems;
};

module.exports = { generateCartItemTokens };
