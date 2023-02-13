const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/productsController');

//Listado productos
router.get('/',productController.index);
router.get('/shop',productController.shop);
router.get("/productDetail", productController.productDetail);
//Ver productos
router.get('/:id',productController.showProduct);
//Creación producto
router.get('/createProduct',productController.createProduct);
router.post('/createProduct',productController.storeProduct);
//Modificación producto
router.get('/editProduct/:id',productController.editProduct);
router.put('/editProduct/:id',productController.updateProduct);
//Eliminación producto
router.get('/delete/:id',productController.deleteProduct);
router.delete('/delete/:id',productController.destroyProduct);





module.exports = router;