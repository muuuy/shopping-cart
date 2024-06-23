const User = require("../models/user");
const Item = require("../models/item");
const Cart = require("../models/cart");
const Order = require("../models/order");

const {
  validateUsername,
  validatePassword,
  validateType,
  validateOrder,
  validatePasswordReset,
  validateUser,
} = require("../middleware/validate");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  next();
};

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

const generateCartItemTokens = async (cart) => {
  const items = await Promise.all(
    cart.items.map((itemID) => Item.findById(itemID).exec())
  );
  const responseItems = items.map((item) => {
    return generateSessionItem(item);
  });

  return responseItems;
};

const getOrders = async (user) => {
  const orders = await Promise.all(
    user.orders.map(async (orderID) => {
      const order = await Order.findById(orderID).exec();
      return order;
    })
  );

  return orders;
};

const getOrderItems = async (order) => {
  const items = await Promise.all(
    order.items.map(async (itemID) => {
      const item = await Item.findById(itemID).exec();
      return item;
    })
  );

  return items;
};

const getUserOrderItems = async (orders) => {
  const orderItems = await Promise.all(
    orders.map(async (order) => {
      const items = await getOrderItems(order);
      return items;
    })
  );

  return orderItems;
};

const getOrderTokens = (items) => {
  const responseOrderItems = items.map((item) => {
    return generateSessionItem(item);
  });

  return responseOrderItems;
};

const getAllOrderTokens = (orderItems) => {
  const responseOrders = orderItems.map((items) => {
    return getOrderTokens(items);
  });

  return responseOrders;
};

const generateOrderInfo = (items, order) => {
  const orderInfo = {
    name: order.name,
    country: order.country,
    state: order.state,
    zip: order.zip,
    orderDate: order.Date,
    items: items,
  };

  return orderInfo;
};

const generateSessionToken = (userID) => {
  const token = jwt.sign({ userId: userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.SESSION_EXPIRE,
  });

  return token;
};

exports.user_create_post = [
  ...validateUser,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    const username = req.body.username;
    var password = req.body.password;
    const email = req.body.email;

    try {
      password = await bcrypt.hash(password, 13);
    } catch (err) {
      console.log("Error while hashing:", err);
    }

    const cart = new Cart();
    await cart.save();

    const user = new User({
      username: username,
      password: password,
      email: email,
      shoppingCart: cart._id,
    });

    await user.save();
    res.redirect("http://localhost:5173/");
  }),
];

exports.user_login = [
  validateUsername,
  validatePassword,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    const username = req.body.username;
    var password = req.body.password;

    if (req.session.authenticated) {
      return res.status(200).json(req.session);
    }

    try {
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!user) {
        return res.status(401).json({ errors: [{ msg: "User not found." }] });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Incorrect password." }] });
      }

      const cart = await Cart.findById(user.shoppingCart).exec(); //add cart items to session
      const responseItems = await generateCartItemTokens(cart);

      const orders = await getOrders(user);
      const orderItems = await getUserOrderItems(orders);
      const responseOrders = getAllOrderTokens(orderItems);

      if (responseOrders.length !== orders.length) {
        return res
          .status(500)
          .json({ errors: [{ msg: "Problem with orders" }] });
      }

      const allOrderInfo = [];
      for (let i = 0; i < orders.length; i++) {
        allOrderInfo.push(generateOrderInfo(responseOrders[i], orders[i]));
      }

      const token = generateSessionToken(user._id);

      req.session.authenticated = true;
      req.session.user = {
        token: token,
        username: user.username,
        email: user.email,
        items: responseItems,
        orders: allOrderInfo,
      };

      return res.status(200).json(req.session);
    } catch (error) {
      return res.status(400).json({ errors: [{ msg: "Error loggin in." }] });
    }
  }),
];

exports.user_forget = [
  validateUsername,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.username }],
      });

      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid Username/Email." }] });
      }

      const token = generateSessionToken(user._id);

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: user.email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
          <p>Click on the following link to reset your password:</p>
          <a href="http://localhost:5173/reset-password/${token}">http://localhost:5000/reset-password/${token}</a>
          <p>If you didn't request a password reset, please ignore this email.</p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
    } catch (error) {
      console.log(error);
    }

    res.redirect("http://localhost:5173/");
  }),
];

exports.user_reset = [
  validateUsername,
  ...validatePasswordReset,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET_KEY
      );
      if (!decodedToken) {
        return res.status(401).send({ error: [{ msg: "Invalid token." }] });
      }

      const user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.username }],
      });
      if (!user) {
        return res
          .status(401)
          .json({ error: [{ msg: "Invalid Username/Email." }] });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        return res.status(401).json({
          errors: [
            {
              msg: "New password cannot be the same as the current password.",
            },
          ],
        });
      }

      var password;
      try {
        password = await bcrypt.hash(req.body.password, 13);
      } catch (err) {
        return res
          .status(500)
          .json({ errors: [{ msg: "Error while hashing." }] });
      }

      user.password = password;

      await user.save();
    } catch (error) {
      res
        .status(500)
        .json({ errors: [{ msg: "Error resetting user information." }] });
    }

    res.redirect("http://localhost:5173/");
  }),
];

exports.user_logout = [
  asyncHandler(async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).send({ errors: [{ msg: "Logout Failed" }] });
      } else {
        res.clearCookie("connect.sid");
        return res.status(200).send({ msg: "Logout successful" });
      }
    });
  }),
];

exports.get_auth = [
  (req, res, next) => {
    if (req.session.authenticated) {
      return res.status(200).json(req.session);
    } else {
      return res.status(401).send({ errors: [{ msg: "Unauthorized" }] });
    }
  },
];

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
        orderDate: order.Date,
        items: responseOrder,
      };

      req.session.user.orders.push(orderInfo);

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
