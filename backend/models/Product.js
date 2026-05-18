const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  category: {
    type: String,
    enum: ['T-Shirts', 'Crop Tops', 'Dresses', 'Jeans', 'Accessories', 'Tops', 'Short Dresses', 'Long Dresses'],
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  stock: {
    type: Number,
    default: 10,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
