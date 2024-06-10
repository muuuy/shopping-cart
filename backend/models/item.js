const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  item: {
    type: Object,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ["Pokemon", "Item"],
    default: "Pokemon",
  },
  cost: {
    type: Number,
    required: true,
    min: 500,
    max: 10000,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  orderDate: {
    type: Date,
    default: null,
  },
  shippingDate: {
    type: Date,
    default: null,
  },
});

//Get total cost of item in cart
ItemSchema.virtual("totalCost").get(function () {
  if (!this.cost || !this.quantity) {
    throw new Error("Cost or quantity is missing or invalid.");
  }
  return this.cost * this.quantity;
});

//Get the picture of the item
ItemSchema.virtual("itemPicture").get(function () {
  if (!this.item) {
    throw new Error("Item is missing or invalid.");
  }
  return this.item.sprites.front_default;
});

//Get the name of the item
ItemSchema.virtual("itemName").get(function () {
  if (!this.item) {
    throw new Error("Item is missing or invalid.");
  }
  return this.item.name;
});

module.exports = mongoose.model("Item", ItemSchema);
