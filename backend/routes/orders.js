const express = require("express");
const router = express.Router();

const order_controller = require("../controllers/orderController");

router.post("/upload-order/", order_controller.upload_order);

module.exports = router;