// routes/products.js - Product Routes

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.render('products', {
      title: 'Products List',
      heading: 'Products Catalog',
      products: products.map(product => product.toObject({ virtuals: true }))
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).render('index', {
      title: 'Error',
      heading: 'Error Fetching Products',
      error: err.message
    });
  }
});

// Show form to add a new product
router.get('/add', (req, res) => {
  res.render('product-form', {
    title: 'Add Product',
    heading: 'Add New Product',
    product: {},
    isEdit: false
  });
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, quantity, inStock } = req.body;
    
    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      quantity: parseInt(quantity, 10),
      inStock: inStock === 'on'
    });
    
    // Save the product
    await newProduct.save();
    
    // Redirect to products list
    res.redirect('/products');
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).render('product-form', {
      title: 'Add Product',
      heading: 'Add New Product',
      product: req.body,
      isEdit: false,
      error: err.message
    });
  }
});

// Show form to edit a product
router.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).render('index', {
        title: 'Not Found',
        heading: 'Product Not Found',
        error: 'The requested product could not be found'
      });
    }
    
    res.render('product-form', {
      title: 'Edit Product',
      heading: 'Edit Product',
      product: product.toObject(),
      isEdit: true
    });
  } catch (err) {
    console.error('Error fetching product for edit:', err);
    res.status(500).render('index', {
      title: 'Error',
      heading: 'Error Fetching Product',
      error: err.message
    });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category, quantity, inStock } = req.body;
    
    // Find and update product
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).render('index', {
        title: 'Not Found',
        heading: 'Product Not Found',
        error: 'The requested product could not be found'
      });
    }
    
    // Update fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.quantity = parseInt(quantity, 10);
    product.inStock = inStock === 'on';
    
    // Save the updated product
    await product.save();
    
    // Redirect to products list
    res.redirect('/products');
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).render('product-form', {
      title: 'Edit Product',
      heading: 'Edit Product',
      product: {
        ...req.body,
        _id: req.params.id
      },
      isEdit: true,
      error: err.message
    });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).render('index', {
      title: 'Error',
      heading: 'Error Deleting Product',
      error: err.message
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).render('index', {
        title: 'Not Found',
        heading: 'Product Not Found',
        error: 'The requested product could not be found'
      });
    }
    
    res.render('product-detail', {
      title: product.name,
      heading: product.name,
      product: product.toObject({ virtuals: true })
    });
  } catch (err) {
    console.error('Error fetching product details:', err);
    res.status(500).render('index', {
      title: 'Error',
      heading: 'Error Fetching Product',
      error: err.message
    });
  }
});

module.exports = router;