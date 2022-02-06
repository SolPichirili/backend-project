const ContainerFirebase = require("../../containers/ContainerFirebase");

class CartFirebaseDaos extends ContainerFirebase{
    constructor(){
        super('carritos')
    }
}

module.exports = CartFirebaseDaos;