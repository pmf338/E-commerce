const express = require ('express');
const router = express.Router();


//Listado usuarios
router.get('/',mainController.home);
//Creación usuario
router.get('/',mainController.home);
router.post('/',mainController.home);
//Modificación usuario
router.get('/',mainController.home);
router.put('/',mainController.home);
//Elimiación usuario
router.get('/',mainController.home);
router.delete('/',mainController.home);



module.exports = router;