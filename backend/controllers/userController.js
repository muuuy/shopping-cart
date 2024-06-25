const User = require("../models/user");
const Cart = require("../models/cart");

const {
  handleErrors,
  validateUsername,
  validatePassword,
  validatePasswordReset,
  validateUser,
} = require("../middleware/validate");

const { generateSessionToken } = require("../middleware/generateSessionItem");
const { generateCartItemTokens } = require("../middleware/generateCartTokens");
const {
  getOrders,
  getUserOrderItems,
  getAllOrderTokens,
  generateOrderInfo,
} = require("../middleware/generateOrderTokens");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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
      return res
        .status(404)
        .json({ errors: [{ msg: "Error while hashing." }] });
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

      const cart = await Cart.findById(user.shoppingCart).exec();
      const responseItems = await generateCartItemTokens(cart);

      let orders = await getOrders(user);
      orders.reverse();
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
