//Login
//Contacto
//Register
//Index


const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainControllers')

//index
router.get("/", mainController.index);

//login
router.get("/login", mainController.login);

//Carrito de compras
router.get("/productCart", mainController.productCart);

//Detalles del producto
router.get("/productDetail", mainController.productDetail);

//Registro
router.get("/register", mainController.register);

//Tienda
router.get("/shop", mainController.shop);

router.get("/shop/:id", mainController.shop);

//Creacion de producto
router.get("/createProduct", mainController.createproduct);

//Contacto
router.get("/contact", mainController.contact);

module.exports = router;