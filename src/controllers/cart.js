const logger = require('../utils/winston');
const daosCart = require('../daos/cartIndex');

const CartDaos = daosCart;

const getAll = async (req, res)=>{
    const carts = await CartDaos.getAll();
    res.send({data: carts});
}

const getNewId = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const cart = req.body;
    const cartId = await CartDaos.getNewId(cart);
    res.send({ data: cartId });
}

const deleteById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const cartDeletedId = await CartDaos.deleteById(id);
    res.send({ data: cartDeletedId });
}

const getById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const cart = await CartDaos.getById(id);
    if(!cart){
        res.send({data: `El carrito con ID ${id} no existe`})
    }
    const { productos } = cart;
    res.send({ data: productos });
}

const addProductById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const id = req.params.id;
    const products = req.body;
    const cart = await CartDaos.addProductById(id, products);
    res.send({ data: cart });
}

const deleteProductById = async (req, res) => {
    logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: Proceso exitoso`);
    const cartId = req.params.id;
    const productId = req.params.id_prod;
    const cart = await CartDaos.deleteProductById(cartId, productId);
    res.send({ data: cart });
}

module.exports = {
    getAll,
    getNewId,
    deleteById,
    getById,
    addProductById,
    deleteProductById
}