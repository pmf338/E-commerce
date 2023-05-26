const express = require ('express');
const productsRouter = express.Router();
const apiProductsController = require ('../../controllers/api/apiProductsController');


//Listado productos
productsRouter.get('/api/dashboardProducts',apiProductsController.dashboardProducts);
productsRouter.get('/api/dashboardLastProduct',apiProductsController.lastProduct);


module.exports = productsRouter;