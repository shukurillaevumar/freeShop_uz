const mongoose = require("mongoose");
const Schema = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
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
    status: {
      type: String,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    },
    desc: {
      type: Object,
      required: true,
    },
    manifacturer_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    created_at: {
      type: Number,
      required: true,
    },
    updated_at: {
      type: Number,
      required: true,
      default: 0,
    },
    discount_id: {
      type: Schema.Types.ObjectId,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
