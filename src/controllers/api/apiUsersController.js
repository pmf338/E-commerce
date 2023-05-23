const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const {User} = require('../../database/models');


const apiUsersController = {
    dashboardUsers : async function (req,res){
        let usersList = await User.findAll();
        try{
            let respuesta = {
                usuarios: {
                    status: 200,
                    total: usersList.length,
                    url: 'http://localhost:3002/api/dashboardUsers'
                },
                data: usersList
            }
            res.json(respuesta);
        } catch (error) {
            res.json({
            status: 404,            
            data: usersList,
            message: 'Algo fallo en dashboardUsers'
            })
        }
    }
}

module.exports = apiUsersController;