const addtoCart = function(btn){
    let product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        image : btn.dataset.image,
        quantity : 1
    }
    //veo un objeto por cada producto - lo que se capture al hacer click
    console.log("addtoCart : ",product);
    let cart = getCart();
    if (cart.length){
        //existe el product?
        let thisProductExist = productExist(product,cart);
        if (thisProductExist){
            cart.forEach(item =>{
                if(item.id == thisProductExist.id) item.quantity ++;
            })
        } else {
            cart.push(product);
        }
    }else{
        cart.push(product);
    }
    //cart.push(product); //agregar elemento
    saveCart(cart); //actualizar el localStorgae

    //mostrar elemento por unos instantes
    hideShowContainers(product.id);
};

//mostrar elemtnos ocultos luego de agregar producto al carrito
function hideShowContainers(id) {
    let completeValue = 'shop-shadow-card-footer-' + id;
    let shadowFooter = document.getElementById(completeValue);

    shadowFooter.style.display = "block"

    setTimeout(()=>{
        shadowFooter.style.display = "none";
    },3000)
   
}