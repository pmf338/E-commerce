const express = require ('express');
const productsRouter = express.Router();

const upload = require('../middlewares/multer');
const rules = require('../middlewares/validator');

const productController = require ('../controllers/productsController');
const artistsController = require ('../controllers/artistsController');


// Artistas
productsRouter.get('/artists',artistsController.artists);
productsRouter.get('/artistDetail/:id',artistsController.artistDetail);
//Listado productos
productsRouter.get('/',productController.index);
productsRouter.get('/shop',productController.shop);
//Ver producto
productsRouter.get("/productDetail/:id", productController.productDetail);
productsRouter.get('/shop/:id',productController.showProduct);
//Creación producto
productsRouter.get('/createProduct',productController.createProduct);
productsRouter.post('/createProduct',upload.single('product_image'),rules,productController.storeProduct)
//Modificación producto
productsRouter.get('/editProduct/:id',productController.editProduct);
productsRouter.put('/editProduct/:id',productController.updateProduct);
//Eliminación producto
productsRouter.get('/deleteProduct/:id',productController.deleteProduct);
productsRouter.delete('/deleteProduct/:id',productController.destroyProduct);





module.exports = productsRouter;