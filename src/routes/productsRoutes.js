const express = require ('express');
const productsRouter = express.Router();

const upload = require('../middlewares/multer');
const rules = require('../middlewares/validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const guestMiddlewareAdmin = require('../middlewares/guestMiddlewareAdmin');
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
productsRouter.get('/createProduct', guestMiddlewareAdmin, productController.createProduct);
productsRouter.post('/createProduct',upload.array('product_image'),rules,productController.storeProduct)
//Modificación producto
productsRouter.get('/editProduct/:id', guestMiddlewareAdmin, productController.editProduct);
productsRouter.put('/editProduct/:id',upload.array('product_image'),rules,productController.updateProduct);
//Eliminación producto
productsRouter.get('/deleteProduct/:id', guestMiddlewareAdmin, productController.destroyProduct);
productsRouter.delete('/deleteProduct/:id',productController.destroyProduct);





module.exports = productsRouter;