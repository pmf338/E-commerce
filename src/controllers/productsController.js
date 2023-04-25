const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, "../data/products.json");
const {validationResult} = require('express-validator');
const {Product} = require('../database/models');
const {Artist} = require('../database/models');
const {Category} = require('../database/models');

const productsController = {
    index : async function (req,res){
        try{
            let productsList = await Product.findAll({
                order: [['updatedAt','ASC']],
                limit: 3     
            });
            let artistsList = await Artist.findAll({
                limit:6
            });
            res.render("products/index", {
                productsList,
                artistsList,
                title: "Inicio",
                user: req.session.userLogged}
            );
        }catch(result){
            res.status(400).json(result);
        }
    },
    shop : async function (req,res){
        try{
            let productsList = await Product.findAll();
            res.render("products/shop", {
                productsList,
                title : "Tienda",
                user: req.session.userLogged}
            );
        }catch(error){
            res.send("error in productsController-shop : ",error)
        }
    },
    showProduct : async function (req,res){
        let productId = req.params.id;
        try{
            let productsList = [];
            productsList = await Product.findByPk(productId);
            res.render("products/shop",{
                productsList,
                title : "Tienda",
                user: req.session.userLogged}
            );
        }catch(error){
            res.send("error in productsController-showProduct : ",error)
        }
    },
    productDetail : async function (req,res){
        let productId = req.params.id;
        try{
            let product = await Product.findByPk(productId);
            res.render("products/productDetail",{
                product,
                title: "Producto",
                user: req.session.userLogged}
            );
        }catch(error){
            res.send("error in productsController-productDetail : ",error)
        }
    },
    createProduct: async function (req, res) {
        try{
            let artistList = await Artist.findAll();
            let categoriesList = await Category.findAll();
            res.render("products/createProduct", {
                artistList,
                categoriesList,
                title: "Creación producto",
                user: req.session.userLogged
            });
        }catch(result){
            //res.send("error in productsController-createProduct : ",error)
            res.status(400).json(result);
        }
    },
    storeProduct: async function (req, res) {
        try{
            console.log("VALOR : ",req.body.product_category)
            Product.create({
                sku :  req.body.product_sku,
                name : req.body.product_name || null,
                price : req.body.product_price || 0,
                quantity : req.body.product_quantity || 0,
                artist_id : req.body.product_artist,
                categories_id : req.body.product_category,
                size : req.body.product_size || null,
                format : req.body.product_format || null,
                color : req.body.product_color || null,
                is_active : 1,
                description : req.body.product_description || "sin descripcion",
                createdAt : Date.now(),
                updatedAt : Date.now(),
                imagePrimary : req.files[0] ? req.files[0].filename : "avatar.jpeg",
                imageSecond : req.files[1] ? req.files[1].filename : "avatar.jpeg",
                imageThird : req.files[2] ? req.files[2].filename : "avatar.jpeg",
            });
            res.redirect ('/shop');
        }catch(result){
            console.log("ERROR ", result);
            res.status(400).json(result);
        }
    },
    editProduct : async function (req,res){
        let productId = req.params.id;
        try{
            let product = await Product.findByPk(productId);
            res.render("products/editProduct",{
                product,
                title: "Editar Producto",
                user: req.session.userLogged}
            );
        }catch(error){
            res.send("error in productsController-productDetail : ",error)
        }
    },
    updateProduct: async function (req, res) {
        try{
            Product.update({
                sku : 1234,
                name : req.body.product_name || "sin nombre",
                price : req.body.product_price || 0,
                quantity : req.body.product_quantity || 0,
                description : req.body.product_description || "sin descripcion",
                artist_id : 1,
                size : req.body.product_size || null,
                color : req.body.product_color || null,
                format : req.body.product_color || null,
                is_active : req.body.product_color || false,
                createdAt : Date.now(),
                updatedAt : Date.now(),
                imagePrimary : req.file ? req.file.filename : "404.jpg",
                categories_id : 2,
            },{
                where : {
                    id : req.params.id
                }
            })
            res.redirect ('/productDetail/'+req.params.id);
        }catch(error){
            res.send("error in productsController-updateProduct : ",error)
        }
        
    },
    deleteProduct : async function (req,res){
        let productId = req.params.id;
        try{
            let product = await Product.findByPk(productId);
            res.render("products/deleteProduct",{
                product,
                title: "Borrar Producto",
                user: req.session.userLogged}
            );
        }catch(error){
            res.send("error in productsController-productDetail : ",error)
        }
    },
    destroyProduct: function (req, res) {
        try{
            Product.destroy({
                where : {
                    id : req.params.id
                }
            })
        }catch(error){
            res.send("error in productsController-destroyProduct : ",error)
        }
        res.redirect ('/shop')
    }
}

module.exports = productsController