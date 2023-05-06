const {body, check} = require('express-validator');

const userRules = [
    body('user_name')

    .isLength({min: 2}).withMessage('Ingrese al menos tres caracteres en el campó Nombre'),

    body('user_surname')
    .isLength({min: 2}).withMessage('Ingrese al menos tres caracteres'),

    body('user_email')
    .isEmail().withMessage('Ingrese un email válido'),

    body('user_pass')
    .isLength({min: 8}).withMessage('Ingrese una contraseña de al menos 8 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,}$/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial')
    /*
    .custom((value, {req}) => {
      if (value !== req.body.user_pass_confirm) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),
    */
];

module.exports = userRules;