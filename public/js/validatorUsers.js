var form = document.getElementById('form')
var newPass = document.getElementById('user_password_edit');
var repeatPass = document.getElementById('user_password_repeat');
var back = document.getElementById('back');
var changePass = document.getElementById('changePass');
var inputs = document.querySelectorAll('input');
var titulos = document.querySelectorAll('h6');
var searchBar = document.getElementById('search-navbar');
var alert_usuario = document.getElementById('alert_user_existent');
var alert_usuario = document.getElementById('alert_user_existent')


/*----------------------------------------------------editProfile.ejs----------------------------------------------*/



//Sacar el required de las contraseñas cuando estas no se esten mostrando
function changePassword(){
  document.getElementById('user_password_old').style.display = "block";
  document.getElementById('lbl_user_password_old').style.display = "block";
  document.getElementById('user_password_edit').style.display = "block";
  document.getElementById('lbl_user_password_edit').style.display = "block";
  document.getElementById('user_password_repeat').style.display = "block";
  document.getElementById('lbl_user_password_repeat').style.display = "block";
  document.getElementById('back_password').style.display = "block";

  


}

function hideButtons(){
  document.getElementById('user_password_old').style.display = "none";
  document.getElementById('lbl_user_password_old').style.display = "none";
  document.getElementById('user_password_edit').style.display = "none";
  document.getElementById('lbl_user_password_edit').style.display = "none";
  document.getElementById('user_password_repeat').style.display = "none";
  document.getElementById('lbl_user_password_repeat').style.display = "none";
  document.getElementById('back_password').style.display = "none";
    
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









