const mongoose = require("mongoose");
const Schema = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["CREATED", "PAID", "DELETED"],
      required: true,
      default: "CREATED",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);
