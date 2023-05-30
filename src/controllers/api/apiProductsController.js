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

    categoriesList: async function (req, res) {
        try {
            const categoryId = req.params.id;

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({
                    error: 'La categoria no fue encontrada'
                });
            }

            const category_products = await Product.findAll({
                where: {
                    categories_id: categoryId
                }
            });

            let respuesta = {
                productos: {
                    status: 200,
                    url: 'http://localhost:3002/api/categoriesList/:categoryId'
                },
                data: category_products
            }

            res.json(respuesta);
        } catch (error) {
            res.json({
            status: 404,            
            //data: category_products,
            message: 'Algo fallo en categoriesList'
            });
        }
    },
    }

module.exports = apiProductsController;