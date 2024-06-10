const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./item");

const WishlistSchema = new Schema({
  items: [Item.schema],
});

WishlistSchema.virtual("totalCost").get(function () {
  if (!this.items || this.items.length === 0) {
    throw new Error("Cart is empty. Cannot calculate total cost.");
  }

  let total = 0;
  for (const item of this.items) {
    total += item.totalCost;
  }

  return total;
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
