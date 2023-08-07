const path = require('path');
const {
    validationResult
} = require('express-validator');
const {
    Artist
} = require('../../database/models');
const {
    Product
} = require('../../database/models');
const {
    where
} = require('sequelize');

const apiArtistController = {
    dashboardArtists : async function (req,res){
        let artistsList = await Artist.findAll();
        try{
            let respuesta = {
                artistas: {
                    status: 200,
                    total: artistsList.length,
                    url: 'http://localhost:3002/api/dashboardArtists'
                },
                data: artistsList
            }
            res.json(respuesta);
        } catch (error) {
            res.json({
            status: 404,            
            data: artistsList,
            message: 'Algo fallo en dashboardArtist'
            })
        }
    },
}
module.exports = apiArtistController;