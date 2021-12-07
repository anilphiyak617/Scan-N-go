const mongoose = require("mongoose");
const validator = require("validator");
//!----Schema
const itemsSchema = new mongoose.Schema({
  uid: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
const Inventory = mongoose.model("Inventory", itemsSchema);
module.exports = Inventory;
