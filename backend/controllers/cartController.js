const Item = require("../models/item");
const Cart = require("../models/cart");
const User = require("../models/user");

const { handleErrors, validateType } = require("../middleware/validate");
const asyncHandler = require("express-async-handler");

exports.shopping_cart = [
  validateType,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(500).json({ errors: [{ msg: "Not logged in." }] });
    }

    try {
      const decodedToken = jwt.verify(
        req.session.user.token,
        process.env.JWT_SECRET_KEY
      );
      if (!decodedToken) {
        return res.status(401).send({ errors: [{ msg: "Invalid token" }] });
      }

      const user = await User.findById(decodedToken.userId).exec();
      if (!user) {
        return res.status(401).json({ error: [{ msg: "Invalid user." }] });
      }

      const item = new Item({
        itemID: req.body.id,
        itemType: req.body.type,
        cost: req.body.cost,
        quantity: req.body.quantity,
      });
      await item.save();

      const cart = await Cart.findById(user.shoppingCart).exec();
      cart.items.push(item._id);
      cart.save();

      const newItem = generateSessionItem(item);

      req.session.user.items.push(newItem);
      res
        .status(200)
        .json({ msg: "Item was added to cart.", newItem: newItem });
    } catch (error) {
      res.status(500).json({ errors: [{ msg: "Error fetching cart" }] });
    }
  }),
];

exports.delete_item = [
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(500).json({ errors: [{ msg: "Not logged in." }] });
    } else {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ errors: [{ msg: "User not found." }] });
      }

      const cart = await Cart.findById(user.shoppingCart).exec();
      if (!cart) {
        return res.status(404).json({ errors: [{ msg: "Cart not found." }] });
      }

      const decodedToken = jwt.verify(
        req.body.token,
        process.env.JWT_SECRET_KEY
      );
      if (!decodedToken) {
        return req.status(404).json({ errors: [{ msg: "Item not found." }] });
      }

      const newCart = cart.items.filter((item) => item != decodedToken.itemId);
      cart.items = newCart;
      cart.save();

      await Item.findByIdAndDelete(decodedToken.itemId);

      const items = await Promise.all(
        cart.items.map((itemID) => Item.findById(itemID).exec())
      );
      const responseItems = items.map((item) => {
        return generateSessionItem(item);
      });

      req.session.user.items = responseItems;

      return res.status(200).json(req.session);
    }
  }),
];
