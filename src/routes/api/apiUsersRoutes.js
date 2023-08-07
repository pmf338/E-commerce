const express = require ('express');
const usersRouter = express.Router();
const apiUsersController = require ('../../controllers/api/apiUsersController');


//Listado productos
usersRouter.get('/api/dashboardUsers',apiUsersController.dashboardUsers);


module.exports = usersRouter;