//Login
//Contacto
//Register
//Index


const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainControllers')

router.get("/", mainController.index);

router.get("/login", (req, res) => {

    res.send("Hola mundo");

});

router.get("/register", (req, res) => {

    res.send("Hola mundo");

});



module.exports = router;