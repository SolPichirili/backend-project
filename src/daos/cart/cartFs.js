const options = require("../../config");
const ContainerFs = require("../../containers/ContainerFs");

class CartFsDaos extends ContainerFs {
    constructor() {
        super(options.file.cartPath);
    }
}

module.exports = CartFsDaos;