const createInitialOption = (msg) => {
    const defaultItem = document.createElement('option');
    defaultItem.text = msg;
    defaultItem.selected = true;
    return defaultItem;
}

const cartList = async () => {
    return await fetch('/api/carrito')
        .then(res => res.json())
        .then(ids => {
            let listCarts = document.querySelector('#carritos');
            listCarts.appendChild(createInitialOption('Elija un carrito'))
            for (const id of ids) {
                const item = document.createElement('option');
                item.value = id;
                item.text = id;
                listCarts.appendChild(item);
            }
        })
}

const productsList = async () => {
    return await fetch('/api/productos')
        .then(res => res.json())
        .then(products => {
            let listProducts = document.querySelector('#productos');
            listProducts.appendChild(createInitialOption('Elija un producto'))
            for (const product of products) {
                const item = document.createElement('option');
                item.value = product._id;
                item.text = product.name;
                listProducts.appendChild(item);
            }
        })
}

cartList();
productsList();

document.querySelector('#btnCrearCarrito').addEventListener('click', async () => {
    const options = { method: 'POST' }
    return await fetch('/api/carrito', options)
        .then(res => res.json())
        .then(({ id }) => {
            cartList().then(() => {
                let listCarts = document.querySelector('#carritos');
                listCarts.value = `${id}`;
                listCarts.dispatchEvent(new Event('change'));
            });
        });
});

const deleteProduct = async (cartId, productId) => {
    const options = { method: 'DELETE' }
    return await fetch(`/api/carrito/${cartId}/productos/${productId}`, options);
}

const eliminate = async (productId) => {
    let cartId = document.querySelector('#carritos').value
    return await deleteProduct(cartId, productId)
        .then(() => {
            updateCart(cartId)
        })
}

const makeHtmlTable = (products) => {
    let html = ``

    if (products.length > 0) {
        html += `
        <h2>Carrito del usuario</h2>
            <div>
                <table class="table table-dark">
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Foto</th>
                    </tr>`
        for (const product of products) {
            html += `
                    <tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><img width="50" src=${product.photo} alt="foto-del-producto></td>
                    <td><a type=button onclick="eliminate('${product._id}')">Eliminar</a></td>
                    </tr>`
        }
        html += `
                </table>
            </div>`
    } else {
        html += `<h3>Carrito vacio.</h3>`
    }
    return Promise.resolve(html);
}


const updateCart = async (cartId) => {
    return await fetch(`/api/carrito/${cartId}/productos`)
        .then(res => res.json())
        .then(products => makeHtmlTable(products))
        .then(html => {
            document.querySelector('#listadoCarrito').innerHTML = html;
        })
}

document.querySelector('#carritos').addEventListener('change', () => {
    let cartId = document.querySelector('#carritos').value
    updateCart(cartId);
});

const addToCart = async (cartId, productId) => {
    const data = { id: productId }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    return await fetch(`/api/carrito/${cartId}}/productos`, options)
        .then(() => {
            updateCart(cartId);
        })
}

document.querySelector('#btnAgregarAlCarrito').addEventListener('click', () => {
    let cartId = document.querySelector('#carritos').value;
    let productId = document.querySelector('#productos').value
    if (cartId && productId) {
        addToCart(cartId, productId)
    } else {
        alert('Debe seleccionar un carrito y un producto')
    }
})

const {send} = require('../../src/utils/nodemailer');
const {sendWsp} = require('../../src/utils/whatsapp');

document.querySelector('#btnFinalizarCompra').addEventListener('click', () => {
    send('Compra finalizada');
    sendWsp('Compra finalizada');
})