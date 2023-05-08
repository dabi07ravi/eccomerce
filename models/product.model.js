const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
},{timstamps : true});

const productModel = mongoose.model('Product',productSchema);

module.exports = productModel;
