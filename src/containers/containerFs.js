const fs = require('fs');

class ContainerFs {
    constructor(file) {
        this.file = file;
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            return list;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getById(id) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')
            const list = JSON.parse(content);
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
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')

            let elements = [];

            if (content === "") {
                element.id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                const list = JSON.parse(content);

                element.id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            const listString = JSON.stringify(elements, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);
            return elements;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getNewId(element) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')

            let elements = [];

            if (content === "") {
                element.id = String(1);
                element.timestamp = Date.now();
                elements.push(element);
            } else {
                const list = JSON.parse(content);

                element.id = String(list.length + 1);
                element.timestamp = Date.now();
                list.push(element);
                elements = list;
            }
            const listString = JSON.stringify(elements, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);
            return element.id;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async update(id, elemento) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
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

            const listString = JSON.stringify(list, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);

            return updatedList;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async addProductById(cartId, products) {
        const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
        const list = JSON.parse(content);
        const element = list.find(e => e.id === cartId);

        if (!element) {
            return `El carrito no existe`;
        }

        if (!element.productos) {
            element.productos = [];
        }

        element.productos.push(products);

        return await this.update(cartId, element);
    }

    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            const element = list.find(e => e.id === id);
            const indexOfElement = list.findIndex(e => e.id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            list.splice(indexOfElement, 1);
            const listString = JSON.stringify(list, null, 2);

            await fs.promises.writeFile(`${this.file}`, listString);
            return list;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteProductById(cartId, productId) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            const cart = list.find(c => c.id === cartId);
            const { productos } = cart;
            const indexOfElement = productos.findIndex(p => p.id === productId);

            productos.splice(indexOfElement, 1);

            const listString = JSON.stringify(list, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);

            return list;
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

module.exports = ContainerFs;