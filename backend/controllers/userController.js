const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.user_create_post = [
  body("username").trim(),
  body("password").trim(),
  body("email").trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const username = req.body.username;
    var password = req.body.password;
    const email = req.body.email;
    console.log(username, password, email);

    // const user = new User({

    // })

    if (!errors.isEmpty()) {
      return;
    } else {
      try {
        password = await bcrypt.hash(password, 13);
      } catch (err) {
        console.log("Error while hashing:", err);
      }
      console.log(password);
    }
  }),
];
