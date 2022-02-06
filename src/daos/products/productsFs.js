const options = require("../../config");
const ContainerFs = require("../../containers/ContainerFs");

class ProductsFsDaos extends ContainerFs {
    constructor() {
        super(options.file.productsPath);
    }
}

module.exports = ProductsFsDaos;