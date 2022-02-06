const firebase = require('firebase-admin');
const options = require('../config');

const serviceAccount = options.firestore.config;

firebase.initializeApp({ credential: firebase.credential.cert(serviceAccount) })

class ContainerFirebase {
    constructor(collection) {
        this.db = firebase.firestore();
        this.collection = this.db.collection(collection);
    }

    async getAll() {
        try {
            const content = await this.collection.get();
            const docs = content.docs;
            const list = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            return list;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getById(id) {
        try {
            const content = this.collection.doc(id);
            const document = await content.get();
            const element = document.data()

            return element;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async save(element) {
        try {
            const content = this.collection.doc();
            element.timestamp = firestore.Timestamp.now();
            await content.create(element);
            const document = await content.get();
            const info = document.data();
            return info;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getNewId(element) {
        try {
            const content = this.collection.doc();
            await content.create(element);
            return content._path.segments;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async update(id, element) {
        try {
            const content = this.collection.doc(id);
            await content.update(element);
            const document = await content.get();
            const info = document.data();
            return info;

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async addProductById(cartId, products) {
        let productos = [];

        products.map(p => {
            productos.push(p)
        })

        return await this.update(cartId, { productos });
    };

    async deleteById(id) {
        try {
            const content = this.collection.doc(id);
            await content.delete();

            if (!content) {
                return { error: 'No encontrado' };
            };

            return await this.getAll();

        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteProductById(cartId, productId) {
        try {
            const content = this.collection.doc(cartId);
            const document = await content.get();
            const info = document.data();


            if (!content) {
                return `El carrito no existe`;
            };

            const elements = info.productos;
            const index = elements.findIndex(p => p.id === productId);
            elements.splice(index, 1);

            await this.update(cartId, { productos: elements });

            return info;

        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

module.exports = ContainerFirebase;