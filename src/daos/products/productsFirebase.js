const ContainerFirebase = require("../../containers/ContainerFirebase");

class ProductsFirebaseDaos extends ContainerFirebase{
    constructor(){
        super('productos')
    }
}

module.exports = ProductsFirebaseDaos;