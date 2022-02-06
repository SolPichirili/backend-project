const express = require('express');
const cartController = require('../controllers/cart');

const cartRouter = express.Router();

cartRouter.get('/', cartController.getAll);

cartRouter.post('/', cartController.getNewId);

cartRouter.delete('/:id', cartController.deleteById);

cartRouter.get('/:id/productos', cartController.getById);

cartRouter.post('/:id/productos', cartController.addProductById);

cartRouter.delete('/:id/productos/:id_prod', cartController.deleteProductById);


module.exports = cartRouter;