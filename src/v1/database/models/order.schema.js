const mongoose = require("mongoose");
const Schema = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["CREATED", "PENDING", "PAID", "PENDING", "SUCCESS", "CANCELLED"],
      required: true,
      default: "PENDING",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
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
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);
