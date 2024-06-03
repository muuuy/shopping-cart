const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const session = require("express-session");

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
    console.log(username, password, email);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    } else {
      try {
        password = await bcrypt.hash(password, 13);
      } catch (err) {
        console.log("Error while hashing:", err);
      }
    }

    const user = new User({
      username: username,
      password: password,
      email: email,
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
    .withMessage("Username must be specified."),
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("Password must be specified."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const username = req.body.username;
    var password = req.body.password;

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    } else {
      try {
        const user = await User.findOne({
          $or: [{ username: username }, { email: username }],
        });

        if (!user) {
          console.log("user doesn't exist");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          console.log("no match");
        }

        if (req.session.authenticated) {
          console.log("auth");
          req.json(req, session);
        } else {
          req.session.authenticated = true;
          req.session.user = {
            username: user.username,
            email: user.email,
          };
        }

        console.log(req.session);
        console.log("yes");
      } catch (error) {
        console.log("err", error);
      }
    }

    res.redirect("http://localhost:5173/");
  }),
];
