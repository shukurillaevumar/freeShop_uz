const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  manifacturer_id: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
