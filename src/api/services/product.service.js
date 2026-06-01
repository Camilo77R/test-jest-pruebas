const Product = require('../models/product.model');

function createProduct(payload) {
  return Product.create(payload);
}

function getProducts() {
  return Product.find().sort({ createdAt: -1 });
}

function getProductById(id) {
  return Product.findById(id);
}

function updateProduct(id, payload) {
  return Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
}

function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
