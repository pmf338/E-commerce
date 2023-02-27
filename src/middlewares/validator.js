const {body} = require('express-validator');

const rules = [
    body('product_name')

    //.notEmpty().withMessage('Ingrese el nombre del producto').bail()

    .isLength({min: 1}).withMessage('Ingrese al menos un caracter'),

    body('product_price')
    .isNumeric().withMessage('Ingrese un valor válido')
    .isInt({min : 1}).withMessage('El valor debe ser mayor a 0')

];

module.exports = rules;