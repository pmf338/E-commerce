const path = require('path');
const {
    validationResult
} = require('express-validator');
const {
    Artist
} = require('../database/models');
const { artistDetail } = require('./productsController');

const artistController = {
    artist: function (req, res) {
       Artist.findAll()
            .then(artistList => {
                res.render("products/artists", {
                    list: artistList,
                    title: "Artistas",
                    user: req.session.userLogged
                })
            }) 
            .catch (function (error) {
                console.log("error artist controler -", error)
            }) 
    },


    artistDetail : function (req,res) {
        let artistId = req.params.id;
        Artist.findByPk(artistId)
            .then( artista => {
                res.render("products/artistDetail", {
                    artist : artista, 
                    title: "Artista",
                    user: req.session.userLogged
                })
                .catch (function (error) {
                    console.log("error artist controler -", error)
                }) 
            }
            )
    }

}

module.exports = artistController