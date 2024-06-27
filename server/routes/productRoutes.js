const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const { authenticate } = require('./auth');
router.use(authenticate);


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Create a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.post('/update/:id', getProduct, async (req, res) => {
  if (req.body.title != null) {
    res.product.title = req.body.title;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    console.log('Delete product ID:', req.params.id);
    await Product.findByIdAndDelete(res.product._id); // Use Mongoose method to delete the product
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete multiple products
router.post('/delete-multiple', async (req, res) => {
  try {
    const { productIds } = req.body;
    await Product.deleteMany({ _id: { $in: productIds } });
    res.json({ message: 'Products deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all products
router.delete('/delete-all', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
  } catch (err) {
    console.error('Error deleting all products:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete products by category
router.delete('/category/:category', async (req, res) => {
  const category = req.params.category;

  try {
    const deletedProducts = await Product.deleteMany({ category });
    res.json({ message: `Deleted ${deletedProducts.deletedCount} products from category ${category}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a single product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
