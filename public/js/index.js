const { send } = require('../../src/utils/nodemailer');
const { sendWsp } = require('../../src/utils/whatsapp');

const apiProducts = {
    get: async () => {
        return fetch('/api/productos')
            .then(response => response.json())
    }
}

const apiCarts = {
    createCart: async () => {
        const options = { method: "POST" }
        return fetch('/api/carrito', options)
            .then(response => response.json())
    },
    getIds: async () => {
        return fetch('/api/carrito')
            .then(response => response.json())
    },
    postProd: async (cartId, prodId) => {
        const data = { id: prodId }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(`/api/carrito/${cartId}/productos`, options)
    },
    getProds: async cartId => {
        return fetch(`/api/carrito/${cartId}/productos`)
            .then(response => response.json())
    },
    deleteProd: async (cartId, prodId) => {
        const options = {
            method: 'DELETE',
        }
        return fetch(`/api/carritos/${cartId}/productos/${prodId}`, options)
    }
}

loadProducts();

loadCarts();

document.querySelectorAll('#btnFinalizarCompra').addEventListener('click', () => {
    const cartId = document.querySelector('#carritos').value;
    alert('Compra realizada');
    send(`Orden de compra exitosa, carrito ${cartId}`);
    sendWsp(`Orden de compra existosa para carrito ${cartId}`);
})

document.querySelector('#btnAgregarAlCarrito').addEventListener('click', () => {
    const cartId = document.querySelector('#carritos').value;
    const prodId = document.querySelector('#productos').value;
    if (cartId && prodId) {
        addToCart(cartId, prodId);
    } else {
        alert('Debe seleccionar un carrito y un producto.');
    }
});

document.querySelector('#btnCrearCarrito').addEventListener('click', () => {
    apiCarts.createCart()
        .then(({ id }) => {
            loadCarts().then(() => {
                const list = document.querySelector('#carritos');
                list.value = `${id}`;
                list.dispatchEvent(new Event('change'));
            });
        });
});

document.querySelector('#carritos').addEventListener('change', () => {
    const cartId = document.querySelector('#carritos').value;
    updateCart(cartId);
})

async function addToCart(cartId, prodId) {
    return apiCarts.postProd(cartId, prodId)
        .then(() => {
            updateCart(cartId);
        })
}

async function deleteFromCart(prodId) {
    const cartId = document.querySelector('#carritos').value;
    return apiCarts.deleteProd(cartId, prodId)
        .then(() => {
            updateCart(cartId);
        });
}

async function updateCart(cartId) {
    return apiCarts.getProds(cartId)
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.querySelector('#carrito').innerHTML = html;
        });
}

function makeHtmlTable(products) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

    if (products.length > 0) {
        html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>`
        for (const prod of products) {
            html += `
                    <tr>
                    <td>${prod.title}</td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td><a type="button" onclick="deleteFromCart('${prod.id}')">Borrar</a></td>
                    </tr>`
        }
        html += `
            </table>
        </div >`
    } else {
        html += `<br><h4>Carrito sin productos.</h2>`
    }
    return Promise.resolve(html);
}

function createFirstOption(message) {
    const defaultItem = document.createElement("option");
    defaultItem.value = '';
    defaultItem.text = message;
    defaultItem.hidden = true;
    defaultItem.disabled = true;
    defaultItem.selected = true;
    return defaultItem;
}

async function loadProducts() {
    const products = await apiProducts.get();
    const list = document.querySelector('#productos');
    list.appendChild(createFirstOption('Elija un producto'));
    for (const prod of products) {
        const item = document.createElement("option")
        item.value = prod.id
        item.text = prod.title
        list.appendChild(item)
    }
}

function empty(list) {
    while (list.childElementCount > 0) {
        list.remove(0);
    }
}

async function loadCarts() {
    return apiCarts.getIds()
        .then(ids => {
            const list = document.querySelector('#carritos');
            empty(list);
            list.appendChild(createFirstOption('Elija un carrito'))
            for (const id of ids) {
                const item = document.createElement("option");
                item.value = id;
                item.text = id;
                list.appendChild(item);
            }
        });
}