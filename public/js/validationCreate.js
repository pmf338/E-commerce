//capturar los elementos

const form = document.getElementById('form_create_product')

// espera a que se cargue el dom con todo los elementos
document.addEventListener('DOMContentLoaded', inicioApp);
//funciones
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