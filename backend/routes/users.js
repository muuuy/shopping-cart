const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/signup/",
  asyncHandler(async (req, res, next) => {
    var { username, password, verifyPassword, email } = req.body;

    console.log(username, password, verifyPassword, email);

    try {
      password = await bcrypt.hash(password, 13);
    } catch (err) {
      console.log("Error while hashing:", err);
    }
    console.log(password);
  })
);

module.exports = router;
