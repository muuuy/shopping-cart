const express = require("express");
const router = express.Router();

const cart_controller = require("../controllers/cartController");

router.post("/shopping-cart/", cart_controller.shopping_cart);

module.exports = router;