const path = require('path');
const {validationResult} = require('express-validator');
const {Artist} = require('../database/models');
const {Product} = require('../database/models');
const { where } = require('sequelize');

const artistController = {
    artists : async function (req,res){
        try{
            let artistsList = await Artist.findAll();
            res.render("products/artists", {artistsList, title: "Artistas", user: req.session.userLogged})
        }catch(status){
            res.status(400).json(status);
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
            let artist_products = await Product.findAll({
                where: {
                    artist_id :  artistId
                }
            },{
                include : [{
                    limit : 3,
                }]
            })
            res.render("products/artistDetail",{
                artist,
                artist_genre,
                artist_products,
                title: "Artista",
                user: req.session.userLogged});
        }catch(result){
            res.status(400).json(result);
            //res.send("error in productsController-index : ",error)
        }
    }
}

module.exports = artistController