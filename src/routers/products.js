const express = require('express');
const productsController = require('../controllers/products');
const { isAdmin } = require('../middlewares/admin');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', isAdmin, productsController.save);

productsRouter.put('/:id', isAdmin, productsController.update);

productsRouter.delete('/:id', isAdmin, productsController.deleteById);

module.exports = productsRouter;