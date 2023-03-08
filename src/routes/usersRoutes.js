const express = require ('express');
const usersRouter = express.Router();


const uploadUser = require('../middlewares/multerUsers');

const upload = require('../middlewares/multer');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


const userController = require ('../controllers/userController');


//métodos del login
usersRouter.get('/login', authMiddleware, userController.login);
usersRouter.get('/logout', guestMiddleware, userController.logout);
usersRouter.post('/login',userController.processLogin);
//Creación usuario
usersRouter.get('/createProfile',upload.single('user_image'),userController.createUser);
usersRouter.post('/createProfile',userController.storeUser);
//Modificación usuario

usersRouter.get('/login',userController.login);
usersRouter.get('/contact',userController.contact);

usersRouter.get('/editProfile',userController.profile);
usersRouter.get('/createProfile',userController.createProfile);
usersRouter.post('/createProfile',uploadUser.any('user_img'),userController.storeUser)

usersRouter.get('/editProfile/:id',userController.editUser);
usersRouter.put('/editProfile/:id',userController.updateUser);
//Entrar a la página de perfil del usuario
usersRouter.get('/profile', guestMiddleware, userController.userProfile);
usersRouter.get('/editProfile',userController.editProfile);



usersRouter.get('/contact',userController.contact);


module.exports = usersRouter;