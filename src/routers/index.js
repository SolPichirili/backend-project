const express = require('express');

const router = express.Router();

const authRouter = require('./auth');
const productsRouter = require('./products');
const cartRouter = require('./cart');
const multerRouter = require('./multer');

router.use(authRouter);
router.use(multerRouter);
router.use('/api/productos', productsRouter);
router.use('/api/carrito', cartRouter);

module.exports = router;