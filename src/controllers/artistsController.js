const path = require('path');
const {validationResult} = require('express-validator');
const {Artist} = require('../database/models');
const {Product} = require('../database/models');

const artistController = {
    artists : async function (req,res){
        try{
            let artistsList = await Artist.findAll();
            res.render("products/artists", {artistsList, title: "Artistas", user: req.session.userLogged})
        }catch(error){
            res.send("error in artistsController-artists : ",error)
        }
    },
    artistDetail : async function (req,res) {
        let artistId = req.params.id;
        try{
            let artist = await Artist.findByPk(artistId);
            let artist_genre = await Artist.findByPk(artistId, {
                include : [{
                    association : "_genre"
                }]
            });
            res.render("products/artistDetail",{
                artist,
                artist_genre,
                title: "Artista",
                user: req.session.userLogged});
        }catch(error){
            res.send("error in artistsController-artists : ",error)
        }
    }
}

module.exports = artistController