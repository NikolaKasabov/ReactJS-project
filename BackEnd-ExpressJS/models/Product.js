const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ['tv', 'phone','laptop'],
  },
  
});

module.exports = mongoose.model('Products-cloudinary', productSchema);
// module.exports = mongoose.model('Products', productSchema);
