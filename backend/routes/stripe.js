const express = require("express");
const router = express.Router();

const stripe_controller = require("../controllers/stripeController");

router.post('/create-payment-intent/', stripe_controller.create_payment_intent);

module.exports = router;