document.addEventListener('DOMContentLoaded', () => renderCart());

const renderCart = () => {
    let cart = getCart();

    cart.forEach(product => {
        renderProduct(product);
    });

    contentProducts.innerHTML += 
    `   
    <div row border border-2 border-primary d-flex justify-content-center align-items-center text-light mt-3" style="background-color: #23252B">
        <div class="col fs-3 text-light">
            <span>TOTAL : $ ${this.getTotal()}</span>
        </div>
        <div class="col">
            <button id="cart-btn-clean" onclick= "clearCart()" class="my-2 btn btn-lg btn-primary">QUITAR TODO</button>
        </div>
        <div class="col">
            <button id="cart-btn-clean" class="my-2 btn btn-lg btn-success">COMPRAR</button>
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
}
//devuelve el total de $$ del cart
function getTotal() {
    let cart = getCart();
    let total = 0;
    cart.forEach(product => total += product.price * product.quantity);
    return total;
}