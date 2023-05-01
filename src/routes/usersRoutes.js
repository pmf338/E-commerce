const express = require ('express');
const usersRouter = express.Router();
const uploadUser = require('../middlewares/multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const userSessionMiddleware = require('../middlewares/userSessionMiddleware');
const guestMiddlewareAdmin = require('../middlewares/guestMiddlewareAdmin');
const userController = require ('../controllers/userController');
//const rulesUsers = require('../middlewares/validatorUsers');


//métodos del login
usersRouter.get('/login', authMiddleware, userController.login);
usersRouter.get('/logout', guestMiddleware, userController.logout);
usersRouter.post('/login',userController.processLogin);
//Creación usuario
usersRouter.get('/createProfile',userController.createUser);
usersRouter.post('/createProfile',uploadUser.single('user_image'),userController.storeUser);
//Modificación usuario
usersRouter.get('/editProfile/:id',userController.editUser);
usersRouter.put('/editProfile/:id',userController.updateUser);
//Entrar a la página de perfil del usuario
usersRouter.get('/profile', guestMiddleware, userController.userProfile);
usersRouter.get('/editProfile',userController.editProfile);
//Entrar al listado de administrar usuarios
usersRouter.get('/users', guestMiddlewareAdmin, userController.userList);


usersRouter.get('/contact',userController.contact);

//export
module.exports = usersRouter;
