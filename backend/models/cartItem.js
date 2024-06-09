const mongoose = require("mongoose");

const CartItemSchema = new Schema({
  Item: {
    type: Object,
    required: true,
  },
  ItemType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
