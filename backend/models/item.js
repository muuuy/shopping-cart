const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemID: {
    type: Number,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ["pokemon", "item"],
    default: "pokemon",
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  // orderDate: {
  //   type: Date,
  //   default: null,
  // },
  // shippingDate: {
  //   type: Date,
  //   default: null,
  // },
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
