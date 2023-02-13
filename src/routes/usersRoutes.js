const express = require ('express');
const router = express.Router();

const userController = require ('../controllers/userController');

/*
//Listado usuarios
router.get('/',mainController.index);
//Creación usuario
router.get('/',mainController.index);
router.post('/',mainController.index);
//Modificación usuario
router.get('/',mainController.index);
router.put('/',mainController.index);
//Eliminación usuario
router.get('/',mainController.index);
router.delete('/',mainController.index);
*/
router.get('/login',userController.login);




module.exports = router;