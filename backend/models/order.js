const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      default: [],
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
