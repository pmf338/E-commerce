const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const {Product} = require('../../database/models');
const {Artist} = require('../../database/models');
const {Category} = require('../../database/models');

const apiProductsController = {
    index : async function (req,res){
        let productsList = await Product.findAll({
            order: [['updatedAt','ASC']],
            limit: 3     
        });
        let artistsList = await Artist.findAll({
            limit:6
        });
       
        try{
            let respuesta = {
                artistas: {
                    status: 200,
                    total: artistsList.length,
                    url: 'http://localhost:3002/api/'

                },
                productos: {
                    status: 200,
                    total: productsList.length,
                    url: 'http://localhost:3002/api/'
                },
                data: artistsList, productsList

            }
            
            res.json(respuesta);
        } catch (error) {
            res.json({
                status: 404,
                
                data: artistsList, productsList,
                
                message: 'Algo fallo en index'

            })
        }
    },
    shop : async function (req,res){
        let productsList = await Product.findAll();
        
        try{
            let respuesta = {
               productos: {
                    status: 200,
                    total: productsList.length,
                    url: 'http://localhost:3002/api/shop'
                },
                data: productsList

            }
            
            res.json(respuesta);
        } catch (error) {
            res.json({
                status: 404,
                
                data: productsList,
                
                message: 'Algo fallo en shop'

            })
        }
    },
    showProduct : async function (req,res){
        let productId = req.params.id;
        let productsList = [];
        productsList = await Product.findByPk(productId);
        
        try{
            let respuesta = {
                productos: {
                     status: 200,
                     total: productsList.length,
                     url: 'http://localhost:3002/api/shop/:id'
                 },
                 data: productsList
 
             }
             
             res.json(respuesta);
            } catch (error) {
                res.json({
                    status: 404,
                    
                    data: productsList,
                    
                    message: 'Algo fallo en showProduct'
    
                })
            }
    },
    productDetail : async function (req,res){
        let productId = req.params.id;
        let product = await Product.findByPk(productId);
        try{
            let respuesta = {
                productos: {
                     status: 200,
                     url: 'http://localhost:3002/api/productDetail/:id'
                 },
                 data: product
 
             }
             
             res.json(respuesta);
            } catch (error) {
                res.json({
                    status: 404,
                    
                    data: product,
                    
                    message: 'Algo fallo en productDetail'
    
                })
            }
    },
    createProduct: async function (req, res) {
        let artistsList = await Artist.findAll();
        let categoriesList = await Category.findAll();
        
        try{
            let respuesta = {
                artistas: {
                    status: 200,
                    total: artistsList.length,
                    url: 'http://localhost:3002/api/createProduct'

                },
                categorias: {
                    status: 200,
                    total: categoriesList.length,
                    url: 'http://localhost:3002/api/createProduct'
                },
                data: artistsList, categoriesList

            }
            
            res.json(respuesta);
        } catch (error) {
            res.json({
                status: 404,
                
                data: artistsList, categoriesList,
                
                message: 'Algo fallo en createProduct'

            })
        }
    },
    storeProduct: async function (req, res) {
        let producto = await Product.create({
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
        
        try{ 
            let respuesta = {
                product: {
                    status: 200,
                    url: 'http://localhost:3002/api/createProduct'

                },
                data: producto

            }
            
            res.json(respuesta);
            res.redirect ('/shop');
        } catch (error) {
            res.json({
                status: 404,
                
                data: producto,
                
                message: 'Algo fallo en storeProduct'

            })
        }
    },
    editProduct : async function (req,res){
        let productId = req.params.id;
        let product = await Product.findByPk(productId);
        try{
            let respuesta = {
                producto: {
                    status: 200,
                    url: 'http://localhost:3002/api/editProduct/:id'

                },
                data: product

            }
            
            res.json(respuesta);
        } catch (error) {
            res.json({
                status: 404,
                
                data: product,
                
                message: 'Algo fallo en editProduct'

            })
        }
    },
    updateProduct: async function (req, res) {
        let product = await Product.update({
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
        });
        
        try{
            let respuesta = {
                producto: {
                    status: 200,
                    url: 'http://localhost:3002/api/editProduct/:id'

                },
                data: product
            }
            res.json(respuesta);
            res.redirect ('/productDetail/'+req.params.id);
        } catch (error) {
            res.json({
                status: 404,
                
                data: product,
                
                message: 'Algo fallo en updateProduct'

            })
        }
        
    },
    deleteProduct : async function (req,res){
        let productId = req.params.id;
        let product = await Product.findByPk(productId);
        try{
            let respuesta = {
                product: {
                    status: 200,
                    url: 'http://localhost:3002/api/editProduct/:id'

                },
                data: product

            }
            
            res.json(respuesta);
        } catch (error) {
            res.json({
                status: 404,
                
                data: product,
                
                message: 'Algo fallo en deleteProduct'

            })
        }
    },
    destroyProduct: function (req, res) {
        try{
            Product.destroy({
                where : {
                    id : req.params.id
                }
            })
        } catch (error) {
            res.json({
                status: 404,
                message: 'Algo fallo en destroyProduct'

            })
        }
        res.redirect ('/shop')
    }
}

module.exports = apiProductsController;