const express = require ('express');
const usersRouter = express.Router();
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
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

//vista para el login
usersRouter.get('/login', authMiddleware, userController.login);
//metodo post para realizar el login
usersRouter.post('/login',userController.processLogin);

usersRouter.get('/contact',userController.contact);

usersRouter.get('/profile', guestMiddleware, userController.profile);
usersRouter.get('/editProfile',userController.editProfile);
usersRouter.get('/createProfile',userController.createProfile);




module.exports = usersRouter;