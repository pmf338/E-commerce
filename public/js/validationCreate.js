//capturar los elementos

const form = document.getElementById('form_create_product')

// espera a que se cargue el dom con todo los elementos
document.addEventListener('DOMContentLoaded', inicioApp);
//funciones
function inicioApp() {
    console.log("ok se cargo el documento");
    form.addEventListener('submit', crearProducto);
    form.product_sku.addEventListener('blur', validarFormulario);
}

function crearProducto(evt) {
    evt.preventDefault()
}

function validarFormulario(evt) {
    let input = evt.target 
    if(input.tagName == 'input') {
        if (!input.tagName.length){
            input.style.borderBottomColor = 'red';
            input.style.color = 'red';
        }
    }
}