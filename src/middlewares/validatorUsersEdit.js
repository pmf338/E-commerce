const {body, check} = require('express-validator');

const userRulesEdit = [

    body('user_name_edit')

    .isLength({min: 3}).withMessage('Ingrese al menos tres caracteres en el campo Nombre'),

    body('user_surname_edit')
    .isLength({min: 2}).withMessage('Ingrese al menos tres caracteres'),

    body('user_user_name_edit')
    .isLength({min: 3}).withMessage('Ingrese al menos tres caracteres'),


    body('user_email_edit')
    .isEmail().withMessage('Ingrese un email válido'),

       // body('user_password_old')
    // .isLength({min: 8}).withMessage('Ingrese una contraseña de al menos 8 caracteres')
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&@#$%/]).{8,}$/).withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial'),
    
];

module.exports = userRulesEdit;