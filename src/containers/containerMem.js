class ContainerMem {
    constructor() {
        this.array = [];
    }

    async getAll() {
        try {
            const list = this.array;
            return list;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getById(id) {
        try {
            const list = this.array;
            const elementList = list.find(e => e.id === id);

            if (!elementList) {
                return { error: 'No encontrado' };
            }
            return elementList;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async save(element) {
        try {
            const list = this.array;

            let elements = [];

            if (list === "") {
                element.id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                element.id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            return elements;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getNewId(element) {
        try {
            const list = this.array;

            let elements = [];

            if (list === "") {
                element.id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                element.id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            return element.id;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async update(id, elemento) {
        try {
            const list = this.array;
            const element = list.find(e => e.id === id);
            const indexOfElement = list.findIndex(e => e.id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            const updatedList = {
                ...element,
                ...elemento
            }

            list[indexOfElement] = updatedList;
            return updatedList;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async addProductById(cartId, products) {
        const list = this.array;
        const element = list.find(e => e.id === cartId);

        if (!element) {
            return `El carrito no existe`;
        };

        if (!element.productos) {
            element.productos = [];
        };

        element.productos.push(products);
        return element;
    };

    async deleteById(id) {
        try {
            const list = this.array;
            const element = list.find(e => e.id === id);
            const indexOfElement = list.findIndex(e => e.id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            list.splice(indexOfElement, 1);
            return list;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteProductById(cartId, productId) {
        try {
            const list = this.array;
            const cart = list.find(c => c.id === cartId);
            const { productos } = cart;
            const indexOfElement = productos.findIndex(p => p.id === productId);

            productos.splice(indexOfElement, 1);
            return list;

        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

module.exports = ContainerMem;