const {body, check} = require('express-validator');

const userRules = [
    body('user_name')

    .isLength({min: 2}).withMessage('Ingrese al menos tres caracteres'),

    body('user_surname')
    .isLength({min: 2}).withMessage('Ingrese al menos tres caracteres'),

    body('user_email')
    .isEmail().withMessage('Ingrese un email válido'),

    body('user_pass')
    .isLength({min: 8}).withMessage('Ingrese una contraseña de al menos 8 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,}$/)
    .withMessage('Password must contain at least one capital letter, one lower case letter, one number, and one special character')
    .custom((value, {req}) => {
      if (value !== req.body.user_pass_confirm) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

module.exports = userRules;