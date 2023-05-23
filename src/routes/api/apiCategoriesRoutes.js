const express = require('express');
const categoriesRouter = express.Router();
const apiCategoriesController = require('../../controllers/api/apiCategoriesController');

//Listado artistas
categoriesRouter.get('/api/dashboardCategories',apiCategoriesController.dashboardCategories);


module.exports = categoriesRouter;