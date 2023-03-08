const express = require ('express');
const usersRouter = express.Router();


const upload = require('../middlewares/multer');


const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const userController = require ('../controllers/userController');

/*
//Listado usuarios
router.get('/',mainController.index);

//Eliminación usuario
router.get('/',mainController.index);
router.delete('/',mainController.index);
*/

//vista para el login
usersRouter.get('/login', authMiddleware, userController.login);
usersRouter.get('/logout', guestMiddleware, userController.logout);
//metodo post para realizar el login
usersRouter.post('/login',userController.processLogin);

usersRouter.get('/contact',userController.contact);


usersRouter.get('/editProfile',userController.profile);
//Creación usuario
usersRouter.get('/createProfile',upload.single('user_image'),userController.createUser);
usersRouter.post('/createProfile',userController.storeUser);
//Modificación usuario
usersRouter.get('/editProfile/:id',userController.editUser);
usersRouter.put('/editProfile/:id',userController.updateUser);

usersRouter.get('/profile', guestMiddleware, userController.profile);
usersRouter.get('/editProfile',userController.editProfile);
usersRouter.get('/createProfile',userController.createProfile);


module.exports = usersRouter;