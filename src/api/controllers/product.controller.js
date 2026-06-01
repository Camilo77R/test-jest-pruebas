const productService = require('../services/product.service');

async function listProducts(_req, res, next) {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

async function removeProduct(req, res, next) {
  try {
    const removedProduct = await productService.deleteProduct(req.params.id);
    if (!removedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  removeProduct,
};
