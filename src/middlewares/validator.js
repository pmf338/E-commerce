const {
    body,
    check
} = require('express-validator');

const rules = [
    body('product_name')
    .isLength({
        min: 2
    }).withMessage('Nombre de producto debe tener al menos dos caracteres'),
    body('product_sku')
    .isLength({
        min: 1
    }).withMessage('SKU debe tener al menos un numero'),
    body('product_price')
    .isLength({
        min: 2
    }).withMessage('El precio del producto debe ser un precio valido'),
    body('product_quantity')
    .isLength({
        min: 1
    }).withMessage('Ingrese una cantidad a inventario valida'),
    body('product_category')
    .isLength({
        min: 1
    }).withMessage('Ingrese una categoria valida'),
    body('product_artist')
    .isLength({
        min: 1
    }).withMessage('Ingrese una artista vinculdo valido'),
    body('product_description')
    .isLength({
        min: 2
    }).withMessage('Ingrese una descripcion valida'),
];

module.exports = rules;