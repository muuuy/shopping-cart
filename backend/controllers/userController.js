const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.user_create_post = [
  body("username")
    .trim()
    .isLength({ min: 5, max: 15 })
    .escape()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers."),
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("Password must be specified."),
  body("verifyPassword")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("You must verify your password."),
  body("email")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("You must enter a valid Email address."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const username = req.body.username;
    var password = req.body.password;
    const email = req.body.email;
    console.log(username, password, email);

    // const user = new User({

    // })

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.json({ errors: errors.array() });
      // return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        password = await bcrypt.hash(password, 13);
      } catch (err) {
        console.log("Error while hashing:", err);
      }
      console.log(password);
    }

    res.redirect("http://localhost:5173/signup");
  }),
];
