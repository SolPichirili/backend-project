const { Schema } = require('mongoose');
const ContainerMongo = require("../../containers/ContainerMongo");

class CartMongoDaos extends ContainerMongo {
    constructor() {
        super('carritos', new Schema({
            productos: { type: Array, default: [], required: true },
            timestamp: {type: Date, default: Date.now(), required: true}
        }))
    }
}

module.exports = CartMongoDaos;