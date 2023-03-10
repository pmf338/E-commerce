const {body} = require('express-validator');

const rules = [
    body('user_name')

    .isLength({min: 3}).withMessage('Ingrese al menos tres caracteres'),

];

module.exports = rules;