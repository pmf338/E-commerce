const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const {Product} = require('../database/models');
const {Artist} = require('../database/models');
const {Category} = require('../database/models');

const productsController = {
    index : async function (req,res){
        try{
            let productsList = await Product.findAll({
                order: [['updatedAt','DESC']],
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
            let productArtist = await Artist.findByPk(product.artist_id);
            let productCategory = await Category.findByPk(product.categories_id)
            res.render("products/productDetail",{
                product,
                productArtist,
                productCategory,
                title: "Detalle Producto",
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
            let existingProduct = false
            let existingProductbyName = false
            res.render("products/createProduct", {
                artistList,
                categoriesList,
                title: "Creación producto",
                user: req.session.userLogged,
                existingProduct : existingProduct,
                existingProductbyName: existingProductbyName
            });
        }catch(result){
            res.status(400).json(result);
        }
    },
    storeProduct: async function (req, res) {
        let errors = validationResult(req);
        let existingProduct = false
        let existingProductbyName = false
        if(!errors.isEmpty()){
            let artistList = await Artist.findAll();
            let categoriesList = await Category.findAll();
            console.log("error en validacion crear producto", errors)
           return res.render("products/createProduct", {
                artistList,
                categoriesList,
                title: "Creación producto",
                errors: errors.mapped(),
                oldBody: req.body,
                user: req.session.userLogged,
                existingProduct : existingProduct,
                existingProductbyName: existingProductbyName
            });
        }

        
        const foundExistingProduct = await Product.findOne({ where: { sku: req.body.product_sku } });
        const foundExistingProductbyName = await Product.findOne({ where: { name: req.body.product_name } });

        if (foundExistingProduct && foundExistingProductbyName){
            let artistList = await Artist.findAll();
            let categoriesList = await Category.findAll();
            let existingProduct = true;
            let existingProductbyName = true
           return res.render("products/createProduct", {
                artistList,
                categoriesList,
                title: "Creación producto",
                oldBody: req.body,
                user: req.session.userLogged,
                existingProduct : existingProduct,
                existingProductbyName: existingProductbyName
            });
        } else if (foundExistingProduct) {
            let artistList = await Artist.findAll();
            let categoriesList = await Category.findAll();
            let existingProduct = true;
            let existingProductbyName = false
           return res.render("products/createProduct", {
                artistList,
                categoriesList,
                title: "Creación producto",
                oldBody: req.body,
                user: req.session.userLogged,
                existingProduct : existingProduct,
                existingProductbyName: existingProductbyName
            });
        } else if (foundExistingProductbyName) {
            let artistList = await Artist.findAll();
            let categoriesList = await Category.findAll();
            let existingProduct = false;
            let existingProductbyName = true
           return res.render("products/createProduct", {
                artistList,
                categoriesList,
                title: "Creación producto",
                oldBody: req.body,
                user: req.session.userLogged,
                existingProduct : existingProduct,
                existingProductbyName: existingProductbyName
            });
        }

        
        try{
            let active_value;
            if (req.body.product_is_active == true){
                active_value = 1;
            }else{
                active_value = 2;
            }
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
                is_active : active_value,
                description : req.body.product_description || "sin descripcion",
                createdAt : Date.now(),
                updatedAt : Date.now(),
                imagePrimary : req.files[0] ? req.files[0].filename : "avatar.jpeg",
                imageSecond : req.files[1] ? req.files[1].filename : "avatar.jpeg",
                imageThird : req.files[2] ? req.files[2].filename : "avatar.jpeg",
            });
            res.redirect ('/shop');
        }catch(error){
            res.send("error in productsController-createProduct : ", error)
        } 
    },
    editProduct : async function (req,res){
        let productId = req.params.id;
        try{
            let product = await Product.findByPk(productId);
            let artistList = await Artist.findAll();
            let categoriesList = await Category.findAll();
            let productArtist = await Artist.findByPk(product.artist_id);
            let productCategory = await Category.findByPk(product.categories_id)
            res.render("products/editProduct",{
                product,
                artistList,
                categoriesList,
                productCategory,
                productArtist,
                title: "Editar Producto",
                user: req.session.userLogged}
            );
        }catch(error){
            res.send("error in productsController-productDetail : ",error)
        }
    },
    updateProduct: async function (req, res) {

        let errors = validationResult(req);
        let productId = req.params.id;
        let productImage = await Product.findByPk(productId);
        console.log("producto",productImage);
        if(!errors.isEmpty()){
            let product = await Product.findByPk(productId);
            let artistList = await Artist.findAll();
            let categoriesList = await Category.findAll();
            let productArtist = await Artist.findByPk(product.artist_id);
            let productCategory = await Category.findByPk(product.categories_id)
            return res.render("products/editProduct",{
                product,
                artistList,
                errors: errors.mapped(),
                categoriesList,
                productCategory,
                productArtist,
                title: "Editar Producto",
                user: req.session.userLogged}
            );
        }

        try{
            let active_value;
            if (req.body.product_is_active == "true"){
                active_value = 1;
            }else{
                active_value = 2;
            }
            Product.update({
                sku : req.body.product_sku,
                name : req.body.product_name || null,
                price : req.body.product_price || 0,
                quantity : req.body.product_quantity || 0,
                artist_id : req.body.product_artist,
                categories_id : req.body.product_category,
                size : req.body.product_size || null,
                description : req.body.product_description || "sin descripcion",
                format : req.body.product_format || null,
                color : req.body.product_color || null,
                is_active : active_value,
                description : req.body.product_description || "sin descripcion",
                updatedAt : Date.now(),
                imagePrimary : req.files[0] ? req.files[0].filename : productImage.dataValues.imagePrimary,
                imageSecond : req.files[1] ? req.files[1].filename : productImage.dataValues.imageSecond,
                imageThird : req.files[2] ? req.files[2].filename : productImage.dataValues.imageThird,
            },{
                where : {
                    id : req.params.id
                }
            })
            res.redirect ('/productDetail/'+req.params.id);
        }catch(result){
            res.status(400).json(result);
        }     
    },
    destroyProduct: async function (req, res) {
        try {
            let producto = await Product.findOne({
                where: {id: req.params.id}
            });
            
            if(producto)
            {
                await producto.destroy();
                res.redirect('/')
            }
            
        } catch (result) {
            res.status(400).json(result);
        }
        
    },
    cart : async function (req,res){
        try{
            res.render("products/cart",{
                title: "Carrito",
                user: req.session.userLogged}
        );
        }catch(error){
            res.send("error in cart : ",error)
        }
    },
    error : async function (req,res){
        try{
            res.render("products/404",{
                title: "Error-404",
                user: req.session.userLogged}
        );
        }catch(error){
            res.send("error in 404 : ",error)
        }
    }
}

module.exports = productsController