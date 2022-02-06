const mongoose = require('mongoose');
const options = require('../config');

class ContainerMongo {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
        this.init();
    }

    async init() {
        if (!this.connection) {
            this.connection = await mongoose.connect(options.mongodb.url, options.mongodb.options);
        }
    }

    async getAll() {
        try {
            const documents = await this.collection.find({});
            return documents;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getById(id) {
        try {
            const documents = await this.collection.find({ _id: id })

            if (documents.length === 0) {
                return { error: 'No encontrado' };
            }
            return documents[0];

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async save(element) {
        try {
            const document = await this.collection.create(element);
            return document;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getNewId(element) {
        try {
            const document = await this.collection.create(element);
            return document._id;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async update(id, element) {
        try {
            const { n, nModified } = await this.collection.updateOne({ _id: id }, { $set: element })

            if (n == 0 || nModified == 0) {
                return { error: 'No encontrado' };
            };

            const updatedElement = await this.getById(id);
            return updatedElement;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async addProductById(cartId, products) {
        const document = await this.getById(cartId);

        if (!document){
            return {error: 'El carrito no existe.'}
        }

        let elements = document.productos;

        products.map(e=> elements.push(e))

        await this.update(cartId, {productos: elements});

        return elements;
    }


    async deleteById(id) {
        try {
            const document = await this.collection.deleteOne({ _id: id })
            if (!document) {
                return { error: 'No encontrado' };
            };
            return document;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteProductById(cartId, productId) {
        try {
            const document = await this.getById(cartId);

            if (!document) {
                return `El carrito no existe`;
            };

            const elements = document.productos;
            const element = elements.findIndex(e => e.id === productId);
            elements.splice(element, 1);

            await this.update(cartId, {productos: elements});

            return document;

        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

module.exports = ContainerMongo;
