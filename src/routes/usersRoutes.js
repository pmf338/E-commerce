const express = require ('express');
const usersRouter = express.Router();

const upload = require('../middlewares/multer');
const uploadUsers = require('../middlewares/multerUsers');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const userController = require ('../controllers/userController');
const rules = require('../middlewares/validator');
const rulesUsers = require('../middlewares/validatorUsers');


//métodos del login
usersRouter.get('/login', authMiddleware, userController.login);
usersRouter.get('/logout', guestMiddleware, userController.logout);
usersRouter.post('/login',userController.processLogin);
//Creación usuario
usersRouter.get('/createProfile',uploadUsers.single('user_image'),rulesUsers,userController.createUser);
usersRouter.post('/createProfile',userController.storeUser);
//Modificación usuario
usersRouter.get('/editProfile/:id',userController.editUser);
usersRouter.put('/editProfile/:id',userController.updateUser);
//Entrar a la página de perfil del usuario
usersRouter.get('/profile', guestMiddleware, userController.userProfile);
usersRouter.get('/editProfile',userController.editProfile);


usersRouter.get('/contact',userController.contact);

//export
module.exports = usersRouter;
