var form = document.getElementById('form')
var oldPass = document.getElementById('user_password_old');
var newPass = document.getElementById('user_password_edit');
var repeatPass = document.getElementById('user_password_repeat');
var back = document.getElementById('back');
var changePass = document.getElementById('changePass');
var inputs = document.querySelectorAll('input');
var titulos = document.querySelectorAll('h6');
var searchBar = document.getElementById('search-navbar');
var mostrar = [oldPass,newPass,repeatPass,back];

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

/*-----------------------------------------------createProfile.ejs -------------------------------*/
/*
function inicioApp() {
    form.user_name.addEventListener('blur', validarFormulario);
    form.user_surname.addEventListener('blur', validarFormulario);
    form.user_user_name.addEventListener('blur', validarFormulario);
    form.user_email.addEventListener('blur', validarFormulario);
    form.user_email_confirm.addEventListener('blur', validarFormulario);
    form.user_pass.addEventListener('blur', validarFormulario);
    form.user_pass_confirm.addEventListener('blur', validarFormulario);
    form.user_address.addEventListener('blur', validarFormulario);
    
    form.addEventListener('submit', registrarUsuario);
}

function registrarUsuario(evt) {
    evt.preventDefault();
    
    if (form.user_name.value == "") {
        alert("Debes ingresar tu nombre");
    }

    if (form.user_surname.value == "") {
        alert("Debes ingresar tu apellido");
    }

    if (form.user_user_name.value == "") {
        alert("Debes ingresar tu nombre de usuario");
    }
    
    if (form.user_email.value == "") {
        alert("Debes ingresar tu email");
    }

    if (form.user_email_confirm.value == "") {
        alert("Debes ingresar nuevamente tu email");
    }
    
    if (form.user_pass.value == "") {
        alert("Debes ingresar tu password");
    }
    
    if (form.user_pass_confirm.value == "") {
        alert("Debes ingresar nuevamente tu password");
    }

    if (form.user_address.value == "") {
        alert("Debes ingresar nuevamente tu password");
    }
}

function resetForm() {
    form.reset();
}

function validarFormulario(evt) {
    let input = evt.target;
    if (input.tagName == 'INPUT') {
        // validar el error
        if (!input.value.length) {
            input.style.borderColor = 'red';
            input.style.color = 'red';
            
        } else {
            input.style.borderColor = 'green';
            input.style.color = 'black';
        }
    }
}
*/









