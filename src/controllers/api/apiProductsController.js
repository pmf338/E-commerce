const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const {Product} = require('../../database/models');
const {Artist} = require('../../database/models');
const {Category} = require('../../database/models');

const apiProductsController = {
    dashboardProducts : async function (req,res){
        let productsList = await Product.findAll();
        try{
            let respuesta = {
                productos: {
                    status: 200,
                    total: productsList.length,
                    url: 'http://localhost:3002/api/dashboardProducts'
                },
                data: productsList
            }
            res.json(respuesta);
        } catch (error) {
            res.json({
            status: 404,            
            data: productsList,
            message: 'Algo fallo en dashboardProducts'
            })
        }
    }
}

module.exports = apiProductsController;