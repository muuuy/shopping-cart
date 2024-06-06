const User = require("../models/user");

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
    .withMessage("Invalid Username/Email."),
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

exports.user_forget = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 254 })
    .escape()
    .withMessage("Invalid Username/Email."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    } else {
      try {
        const user = await User.findOne({
          $or: [{ username: req.body.username }, { email: req.body.username }],
        });

        if (!user) {
          return res.json({ errors: [{ msg: "Invalid Username/Email." }] });
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
            return res.status(500).send({ message: err.message });
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
      return res.json({ errors: errors.array() });
    } else {
      try {
        const decodedToken = jwt.verify(
          req.params.token,
          process.env.JWT_SECRET_KEY
        );

        if (!decodedToken) {
          return res.status(401).send({ message: "Invalid token" });
        }

        const user = await User.findOne({
          $or: [{ username: req.body.username }, { email: req.body.username }],
        });

        if (!user) {
          return res.json({ error: [{ msg: "Invalid Username/Email." }] });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
          console.log("matching");
          return res.json({
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

        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }
    res.redirect("http://localhost:5173/");
  }),
];
