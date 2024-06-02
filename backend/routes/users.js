const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup/", user_controller.user_create_post);

router.post("/login/", user_controller.user_login);

//WANTED TO ADD LOGIN, WORKED ON IT, BUT HAD TO STASH CHANGES B/C I HAVE NO IDEA WHY IT ISN'T WORKNG

module.exports = router;
