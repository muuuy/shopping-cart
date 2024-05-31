const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup/", user_controller.user_create_post);


module.exports = router;
