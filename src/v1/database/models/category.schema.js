const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
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
    isActive: {
      type: Boolean,
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

module.exports = mongoose.model("Category", categorySchema);
