const { body } = require("express-validator");
const User = require("../models/user");

const validateUsername = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Invalid Username/Email."),
];

const validatePassword = [
  body("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .escape()
    .withMessage("Password must be specified."),
];

const validateType = [
  body("type")
    .trim()
    .custom((type) => {
      if (type !== "pokemon" && type !== "item") {
        throw new Error("Invalid type.");
      } else {
        return true;
      }
    }),
];

const validateOrder = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name is not long enough."),
  body("email")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Invalid email address."),
  body("country")
    .trim()
    .isLength({ min: 2, max: 56 })
    .escape()
    .withMessage("Invalid country."),
  body("state")
    .trim()
    .isLength({ min: 2, max: 2 })
    .escape()
    .withMessage("Invalid state."),
  body("zip")
    .trim()
    .isLength({ min: 5, max: 10 })
    .escape()
    .withMessage("Invalid ZIP code."),
];

const validatePasswordReset = [
  validatePassword,
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
];

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 5, max: 15 })
    .escape()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers.")
    .custom(async (username) => {
      const existingUser = await User.findOne({ username });
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
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new Error("Email already in use.");
      }
      return true;
    }),
];

module.exports = {
  validateUsername,
  validatePassword,
  validateType,
  validateOrder,
  validatePasswordReset,
  validateUser,
};
