const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  apiLink: { type: String, required: true },

  picture: { type: String, required: true },

  cost: { type: Number, required: true },

  quantity: { type: Number, required: true },
});
