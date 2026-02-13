const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  quant: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  category:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  }],
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.model("Product", ProductSchema);
