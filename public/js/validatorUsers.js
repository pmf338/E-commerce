var form = document.getElementById('form')
var oldPass = document.getElementById('user_password_old');
var newPass = document.getElementById('user_password_edit');
var repeatPass = document.getElementById('user_password_repeat');
var back = document.getElementById('back');
var changePass = document.getElementById('changePass');
var inputs = document.querySelectorAll('input');
var titulos = document.querySelectorAll('h6');
var searchBar = document.getElementById('search-navbar');
var alert_usuario = document.getElementById('alert_user_existent');
var mostrar = [oldPass,newPass,repeatPass,back];
var alert_usuario = document.getElementById('alert_user_existent')


/*----------------------------------------------------editProfile.ejs----------------------------------------------*/



//Sacar el required de las contraseñas cuando estas no se esten mostrando
function cambiarPassword(){

    inputs.forEach(arrayInputs =>{arrayInputs.style.display = "none"});
    mostrar.forEach(array1 => {array1.style.display = "block";
                                array1.required = true;});
    titulos.forEach(array2 => {array2.style.display = "none";});

    searchBar.style.display = "block";
    changePass.style.display = "none";
}

function atras(){
    changePass.style.display = "inline";

    inputs.forEach(arrayInputs =>{arrayInputs.style.display = "block"});
    mostrar.forEach(array1 => {array1.style.display = "none";
                                array1.required = false;});
    titulos.forEach(array2 => {array2.style.display = "block";});
    
}

function inicioApp() {
  form.addEventListener('submit', crearProducto);
  form.user_user_name.addEventListener('blur', validarFormulario);
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


function changeState(existingUser) {
  console.log("EXISTE EL USUARIO?", existingUser)
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









