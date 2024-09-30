const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    ouner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    category: { type: String },
  },
  { timestamps: true }
);

const ProductModule = mongoose.model("Product", ProductSchema);
module.exports = ProductModule;
