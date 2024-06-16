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

router.post("/reset-password/:token", user_controller.user_reset);

router.post("/logout/", user_controller.user_logout);

router.post("/auth/", user_controller.get_auth);

router.post("/shopping-cart/", user_controller.shopping_cart);

router.post("/delete-item/", user_controller.delete_item)

module.exports = router;
