const express = require ('express');
const productsRouter = express.Router();

const productController = require ('../controllers/productsController');

// Artistas
productsRouter.get('/artist',productController.artist);
//Listado productos
productsRouter.get('/',productController.index);
productsRouter.get('/shop',productController.shop);
//Ver producto
productsRouter.get("/productDetail/:id", productController.productDetail);
productsRouter.get('/shop/:id',productController.showProduct);
//Creación producto
productsRouter.get('/createProduct',productController.createProduct);
productsRouter.post('/createProduct',productController.storeProduct);
//Modificación producto
productsRouter.get('/editProduct/:id',productController.editProduct);
productsRouter.put('/editProduct/:id',productController.updateProduct);
//Eliminación producto
productsRouter.get('/delete/:id',productController.deleteProduct);
productsRouter.delete('/delete/:id',productController.destroyProduct);





module.exports = productsRouter;