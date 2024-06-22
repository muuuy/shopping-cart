const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shoppingCart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: [],
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
