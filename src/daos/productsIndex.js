const ProductsMongoDaos = require('./products/productsMongo');
const ProductsFsDaos = require('./products/productsFs');
const ProductsMemDaos = require('./products/productsMem');
const ProductsFirebaseDaos = require('./products/productsFirebase');

let daos;

switch(process.env.STORAGE){
    case 'mongodb':
        daos = new ProductsMongoDaos;
        break;
    case 'file':
        daos = new ProductsFsDaos;
        break;
    case 'firebase':
        daos = new ProductsFirebaseDaos;
        break;
    default: 
        daos = new ProductsMemDaos;
        break;
}

module.exports = daos;