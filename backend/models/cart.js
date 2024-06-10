const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    items: {
        
    }
});

module.exports = mongoose.model("Cart", CartSchema); 