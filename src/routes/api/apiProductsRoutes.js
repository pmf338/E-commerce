const express = require ('express');
const productsRouter = express.Router();

const upload = require('../../middlewares/multer');
const rules = require('../../middlewares/validator');
const guestMiddlewareAdmin = require('../../middlewares/guestMiddlewareAdmin');
const apiProductsController = require ('../../controllers/api/apiProductsController');



//Listado productos
productsRouter.get('/api/',apiProductsController.index);
productsRouter.get('/api/shop',apiProductsController.shop);
//Ver producto
productsRouter.get("/api/productDetail/:id", apiProductsController.productDetail);
productsRouter.get('/api/shop/:id',apiProductsController.showProduct);
//Creación producto
productsRouter.get('/api/createProduct', guestMiddlewareAdmin, apiProductsController.createProduct);
productsRouter.post('/api/createProduct',upload.array('product_image'),rules,apiProductsController.storeProduct)
//Modificación producto
productsRouter.get('/api/editProduct/:id', guestMiddlewareAdmin, apiProductsController.editProduct);
productsRouter.put('/api/editProduct/:id',apiProductsController.updateProduct);
//Eliminación producto
productsRouter.get('/api/deleteProduct/:id', guestMiddlewareAdmin, apiProductsController.deleteProduct);
productsRouter.delete('/api/deleteProduct/:id',apiProductsController.destroyProduct);





module.exports = productsRouter;