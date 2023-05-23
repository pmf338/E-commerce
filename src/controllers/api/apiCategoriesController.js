const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const {Category} = require('../../database/models');

const apiCategoriesController = {
    dashboardCategories : async function (req,res){
        let categoriesList = await Category.findAll();
        try{
            let respuesta = {
                categorias: {
                    status: 200,
                    total: categoriesList.length,
                    url: 'http://localhost:3002/api/dashboardCategories'
                },
                data: categoriesList
            }
            res.json(respuesta);
        } catch (error) {
            res.json({
            status: 404,            
            data: categoriesList,
            message: 'Algo fallo en dashboardCategories'
            })
        }
    }
}

module.exports = apiCategoriesController;