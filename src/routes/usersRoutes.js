const express = require ('express');
const usersRouter = express.Router();

const upload = require('../middlewares/multer');

const userController = require ('../controllers/userController');

/*
//Listado usuarios
router.get('/',mainController.index);

//Eliminación usuario
router.get('/',mainController.index);
router.delete('/',mainController.index);
*/
usersRouter.get('/login',userController.login);
usersRouter.get('/contact',userController.contact);

usersRouter.get('/editProfile',userController.profile);
//Creación usuario
usersRouter.get('/createProfile',upload.single('user_image'),userController.createUser);
usersRouter.post('/createProfile',userController.storeUser);
//Modificación usuario
usersRouter.get('/editProfile/:id',userController.editUser);
usersRouter.put('/editProfile/:id',userController.updateUser);

module.exports = usersRouter;