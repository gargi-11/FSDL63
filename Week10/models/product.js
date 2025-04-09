// models/product.js - Product Model Schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Product Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add pre-save middleware to update the updatedAt field
ProductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a virtual property for formatted price
ProductSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Instance method to apply discount
ProductSchema.methods.applyDiscount = function(percentage) {
  const discountAmount = (this.price * percentage) / 100;
  this.price = parseFloat((this.price - discountAmount).toFixed(2));
  return this.price;
};

// Static method to find products by category
ProductSchema.statics.findByCategory = function(category) {
  return this.find({ category });
};

// Create and export model
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;