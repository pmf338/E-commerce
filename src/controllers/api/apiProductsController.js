const fs = require('fs');
const {Product} = require('../../database/models');


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
    },

    lastProduct : async function (req,res){
        try{
            let product = await Product.findAll({
                order: [['createdAt','DESC']],
                limit: 1     
            });
            let respuesta = {
                producto: {
                    status: 200,
                    url: 'http://localhost:3002/api/dashboardLastProduct'
                },
                data: product
            }
            res.json(respuesta);
        } catch (error) {
            res.json({
            status: 404,            
            data: product,
            message: 'Algo fallo en dashboardLastProduct'
            });
        }
    },
}

module.exports = apiProductsController;