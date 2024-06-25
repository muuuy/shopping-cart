const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.post("/signup/", user_controller.user_create_post);

router.post("/login/", user_controller.user_login);

router.post("/forget/", user_controller.user_forget);

router.post("/reset-password/:token", user_controller.user_reset);

router.post("/logout/", user_controller.user_logout);

router.post("/auth/", user_controller.get_auth);

module.exports = router;
