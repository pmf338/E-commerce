const express = require ('express');
const usersRouter = express.Router();

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
usersRouter.get('/login',userController.login);
usersRouter.get('/contact',userController.contact);

usersRouter.get('/editProfile',userController.profile);
usersRouter.get('/createProfile',userController.createProfile);


module.exports = usersRouter;