//capturar los elementos

const form = document.getElementById('form_create_product')
var category = document.getElementById('product_category');
var size = document.getElementById('product_size');
var color = document.getElementById('product_color');
var format = document.getElementById('product_format');
var alert_sku = document.getElementById('alert_sku_existent')



// espera a que se cargue el dom con todo los elementos
document.addEventListener('DOMContentLoaded', inicioApp);
//funciones

function specialInputs() {
  if (category.value == 1){
    size.style.display = "block"
    color.style.display = "block"
    format.style.display = "block"
  } else {
    size.style.display = "none"
    color.style.display = "none"
    format.style.display = "none"
  }
}

function specialInputs() {
  if (category.value == 1){
    size.style.display = "block"
    color.style.display = "block"
    format.style.display = "block"
  } else {
    size.style.display = "none"
    color.style.display = "none"
    format.style.display = "none"
  }
}

function specialInputsDetails() {
  if (category.value == "Ropa"){
    size.style.display = "block"
    color.style.display = "block"
    format.style.display = "block"
  } else {
    size.style.display = "none"
    color.style.display = "none"
    format.style.display = "none"
  }
}

function specialInputsSelect() {
  if (category.value == 1){
    size.style.display = "block"
    color.style.display = "block"
    format.style.display = "block"
  } else {
    size.style.display = "none"
    color.style.display = "none"
    format.style.display = "none"
  }
}

function inicioApp() {
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


function changeState(existingProduct) {
   console.log("EXISTE EL PRODUCTO?", existingProduct)
 }


    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'
  
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
  
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
  
            form.classList.add('was-validated')
          }, false)
        })
      })()