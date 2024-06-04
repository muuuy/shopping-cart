const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup/", user_controller.user_create_post);

router.post("/login/", user_controller.user_login);

router.post("/forget/", user_controller.user_forget);

module.exports = router;
