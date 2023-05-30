document.addEventListener('DOMContentLoaded', () => renderCart());

const renderCart = () => {
    let cart = getCart();

    cart.forEach(product => {
        renderProduct(product);
    });

    contentProducts.innerHTML += 
    `   
    <div class="row border border-2 border-success d-flex justify-content-center align-items-center text-light mt-4" style="background-color: #23252B">
        <div class="col fs-3 text-light">
            <span>TOTAL : $ ${this.getTotal()}</span>
        </div>
    </div>
    <div class="row d-flex justify-content-center align-items-center text-light mt-4">
        <div class="col">
            <button id="cart-btn-clean" onclick= "clearCart()" class="my-2 btn btn-lg btn-primary">QUITAR TODO</button>
        </div>
        <div class="col">
            <a href="/" class="text-decoration-none"><button id="cart-btn-clean" onclick= "buyAction()" class="my-2 btn btn-lg btn-success">COMPRAR</button></a>
        </div>
    </div>
    `
}

//limpiar todos los datos del cart
function clearCart() {
    localStorage.clear();
    location.reload();
}
//eliminar un product en particular del cart
function removeItem(productId) {
    let cart = getCart();
    let newCart = cart.filter(product => product.id != productId);
    saveCart(newCart);
    location.reload();
}
//devuelve el total de $$ del cart
function getTotal() {
    let cart = getCart();
    let total = 0;
    cart.forEach(product => total += product.price * product.quantity);
    return total;
}
//cartel post-comprar
function buyAction(){
    ("COMPRA REALIZADA CON EXITO");
    clearCart();
}