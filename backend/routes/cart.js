const express = require("express");
const router = express.Router();

const cart_controller = require("../controllers/cartController");

router.post("/shopping-cart/", cart_controller.shopping_cart);

router.post("/delete-item/", cart_controller.delete_item);

module.exports = router;
