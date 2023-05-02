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
    artists: async function (req, res) {
        try {
            let artistsList = await Artist.findAll();
            let respuesta = {
                todoOk: {
                    status: 200,
                    total: artistsList.length,
                    url: 'http://localhost:3002/api/artists'

                },
                data: artistsList

            }

            res.json(respuesta);
        } catch (error) {
            res.json({
                status: 404,
                data: artistsList,
                message: 'Algo fallo en artists'

            });
        }
    },
    artistDetail: async function (req, res) {
        let artistId = req.params.id;
        try {
            let artist = await Artist.findByPk(artistId);
            let artist_genre = await Artist.findByPk(artistId, {
                include: [{
                    association: "_genre"
                }]
            });
            let artist_products = await Product.findAll({
                where: {
                    artist_id: artistId
                }
            }, {
                include: [{
                    limit: 3,
                }]
            })
            let respuesta = {
                artista: {
                    status: 200,
                    artistProducts: artist_products.length,
                    url: 'http://localhost:3002/api/artistDetail/:id'

                },
                genero: {
                    status: 200,
                    url: 'http://localhost:3002/api/artistDetail/:id'
                },
                data: artist,
                artist_genre,
                artist_products

            }

            res.json(respuesta);
        } catch (error) {
            res.json({
                status: 404,
                
                data: artist,
                artist_genre,
                artist_products,
                
                message: 'Algo fallo en artistDetail'

            })
        }
    }
}
module.exports = apiArtistController;