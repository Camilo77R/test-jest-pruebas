const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.listProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.removeProduct);

module.exports = router;
