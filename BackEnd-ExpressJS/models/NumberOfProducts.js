const mongoose = require('mongoose');

const numberOfProductsSchema = new mongoose.Schema({
  all: Number,
  tv: Number,
  laptop: Number,
  phone: Number
});

module.exports = mongoose.model('NumberOfProducts', numberOfProductsSchema);
