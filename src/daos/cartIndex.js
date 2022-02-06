const CartMongoDaos = require('./cart/cartMongo');
const CartFsDaos = require('./cart/cartFs');
const CartMemDaos = require('./cart/cartMem');
const CartFirebaseDaos = require('./cart/cartFirebase');

let daosCart;

switch(process.env.CART_STORAGE){
    case 'mongodb':
        daosCart = new CartMongoDaos;
        break;
    case 'file':
        daosCart = new CartFsDaos;
        break;
    case 'firebase':
        daosCart = new CartFirebaseDaos;
        break;
    default: 
        daosCart = new CartMemDaos;
        break;
}

module.exports = daosCart;