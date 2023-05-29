let contentProducts = document.getElementById('products');

//guardar el carrito
function saveCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
}
//obtener el carrito
function getCart(){
    return JSON.parse(localStorage.getItem('cart')) || [];
}
//validar si un producto ya existe en el cart
function productExist(product, cart) {
    return cart.find(item => item.id == product.id)
}


//renderización de un producto
const renderProduct = (product) => {
    contentProducts.innerHTML += 
    `
    <div class="row border border-1 border-primary d-flex justify-content-center align-items-center text-light my-1" style="background-color: #23252B">
        <div class="col">
            <img src="/images/products/${product.image}" style=" width:80px;  height:80px;  border-radius:100px"/>
        </div>
        <div class="col fs-4">
            ${product.name}
        </div>
        <div class="col fs-4">
           $${product.price}
        </div>
        <div class="col fs-4">
            ${product.quantity}
        </div>
        <div class="col">
            <button id="cart-btn-delete" onclick="removeItem(${product.id})" class="btn btn-danger btn-lg">ELIMINAR</button>
        </div>
    </div>
    `;
}

