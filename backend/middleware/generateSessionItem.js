const jwt = require("jsonwebtoken");

const generateSessionItem = (item) => {
  const token = jwt.sign({ itemId: item._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.SESSION_EXPIRE,
  });

  const newItem = {
    token: token,
    itemID: item.itemID,
    itemType: item.itemType,
    quantity: item.quantity,
    cost: item.cost,
  };

  return newItem;
};

const generateSessionToken = (userID) => {
  const token = jwt.sign({ userId: userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.SESSION_EXPIRE,
  });

  return token;
};

module.exports = { generateSessionItem, generateSessionToken };
