const User = require("../models/user");
const Item = require("../models/item");
const Cart = require("../models/cart");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.user_create_post = [
  body("username")
    .trim()
    .isLength({ min: 5, max: 15 })
    .escape()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers.")
    .custom(async (username) => {
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        throw new Error("Username already in use.");
      }
      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("Password must be specified."),
  body("verifyPassword")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("You must verify your password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
  body("email")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("You must enter a valid Email address.")
    .custom(async (email) => {
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        throw new Error("Email already in use.");
      }
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const username = req.body.username;
    var password = req.body.password;
    const email = req.body.email;

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      try {
        password = await bcrypt.hash(password, 13);
      } catch (err) {
        console.log("Error while hashing:", err);
      }
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
  body("username")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Invalid Username/Email."),
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("Password must be specified."),

  asyncHandler(async (req, res, next) => {
    console.log(req.sessionID);

    const errors = validationResult(req);

    const username = req.body.username;
    var password = req.body.password;

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      if (req.session.authenticated) {
        res.status(200).json(req.session);
      } else {
        try {
          const user = await User.findOne({
            $or: [{ username: username }, { email: username }],
          });

          if (!user) {
            return res
              .status(401)
              .json({ error: [{ msg: "User not found." }] });
          }

          const match = await bcrypt.compare(password, user.password);

          if (!match) {
            res.status(401).json({ error: [{ msg: "Incorrect password." }] });
          }

          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.SESSION_EXPIRE }
          );

          req.session.authenticated = true;
          req.session.user = {
            token: token,
            username: user.username,
            email: user.email,
          };

          console.log(req.session);

          res.status(200).json(req.session);
        } catch (error) {
          res.status(400).json({ message: "Error loggin in." });
        }
      }
    }
  }),
];

exports.user_forget = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Invalid Username/Email."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      try {
        const user = await User.findOne({
          $or: [{ username: req.body.username }, { email: req.body.username }],
        });

        if (!user) {
          res
            .status(401)
            .json({ errors: [{ msg: "Invalid Username/Email." }] });
        }

        console.log(user);

        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRE }
        );

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
    }

    res.redirect("http://localhost:5173/");
  }),
];

exports.user_reset = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Invalid Username/Email."),
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("Password must be specified."),
  body("verifyPassword")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("You must verify your password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    } else {
      try {
        const decodedToken = jwt.verify(
          req.params.token,
          process.env.JWT_SECRET_KEY
        );

        if (!decodedToken) {
          res.status(401).send({ message: "Invalid token" });
        }

        const user = await User.findOne({
          $or: [{ username: req.body.username }, { email: req.body.username }],
        });

        if (!user) {
          res.status(401).json({ error: [{ msg: "Invalid Username/Email." }] });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
          res.status(401).json({
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
          console.log("Error while hashing:", err);
        }

        user.password = password;

        await user.save();
      } catch (error) {
        res.status(500).json({ message: "Error resetting user information." });
      }
    }
    res.redirect("http://localhost:5173/");
  }),
];

exports.user_logout = [
  asyncHandler(async (req, res, next) => {
    console.log(req.sessionID);

    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(400).send({ msg: "Logout Failed" });
      } else {
        res.clearCookie("connect.sid");
        res.status(200).send({ message: "Logout successful" });
      }
    });
  }),
];

exports.get_auth = [
  (req, res, next) => {
    console.log(req.sessionID);

    if (req.session.authenticated) {
      res.status(200).json(req.session);
    } else {
      console.log("Unauth");
      res.status(401).send({ message: "Unauthorized" });
    }
  },
];

exports.shopping_cart = [
  body("type")
    .trim()
    .custom((type) => {
      if (type !== "pokemon" && type !== "item") {
        throw new Error("Invalid type.");
      } else {
        return true;
      }
    }),

  asyncHandler(async (req, res, next) => {
    console.log(req.sessionID);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
    }

    try {
      const decodedToken = jwt.verify(
        req.session.user.token,
        process.env.JWT_SECRET_KEY
      );

      if (!decodedToken) {
        res.status(401).send({ message: "Invalid token" });
      }

      const user = await User.findById(decodedToken.userId).exec();

      if (!user) {
        res.status(401).json({ error: [{ msg: "Invalid user." }] });
      }

      console.log(1);

      const item = new Item({
        itemID: req.body.id,
        itemType: req.body.type,
        cost: req.body.cost,
        quantity: req.body.quantity,
      });

      console.log(2);

      await item.save();

      console.log(3);

      const cart = await Cart.findById(user.shoppingCart).exec();

      cart.items.push(item._id);

      cart.save();

      // user.shoppingCart.items.push(item._id);

      // await user.save();

      res.status(200).json({ message: "Item was added to cart." });
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart" });
    }
  }),
];
