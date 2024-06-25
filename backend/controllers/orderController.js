const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");

const {
  getOrderItems,
  getOrderTokens,
} = require("../middleware/generateOrderTokens");
const { handleErrors, validateOrder } = require("../middleware/validate");
const asyncHandler = require("express-async-handler");

exports.upload_order = [
  ...validateOrder,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(401).json({ errors: [{ msg: "Not logged in." }] });
    }

    try {
      const user = await User.findOne({
        username: req.session.user.username,
      });
      if (!user) {
        return res.status(404).json({ errors: [{ msg: "Invalid user." }] });
      }

      const cart = await Cart.findById(user.shoppingCart).exec();
      if (!cart) {
        return res.status(404).json({ errors: [{ msg: "Invalid cart." }] });
      } else if (cart.items.length === 0) {
        return res.status(400).json({ errors: [{ msg: "Cart is empty." }] });
      }

      const order = new Order({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip,
        orderDate: new Date(),
        items: cart.items,
      });
      order.save();

      user.orders.push(order._id);
      user.save();

      cart.items = [];
      cart.save();

      req.session.user.items = [];

      const items = await getOrderItems(order);
      const responseOrder = getOrderTokens(items);

      const orderInfo = {
        name: order.name,
        country: order.country,
        state: order.state,
        zip: order.zip,
        orderDate: order.orderDate,
        items: responseOrder,
      };

      req.session.user.orders.unshift(orderInfo);

      return res
        .status(200)
        .json({ session: req.session, addOrder: orderInfo });
    } catch (error) {
      return res
        .status(500)
        .json({ errors: [{ msg: "Something went wrong." }] });
    }
  }),
];
