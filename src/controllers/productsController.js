const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, "../data/products.json");
const {validationResult} = require('express-validator');
const {Product} = require('../database/models');
const {Artist} = require('../database/models');

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
                user: req.session.userLogged
            });
            

        }catch(error){
            res.status(400).json(error);
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
    createProduct: function (req, res) {
        res.render("products/createProduct", {
            title: "Creación de producto",
            user: req.session.userLogged
        });
    },
    storeProduct: function (req, res) {
        //Validación de errores
        let errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.render("products/createProduct", {
                title: "Creación de producto",
                errors : errors.mapped(),
                user: req.session.userLogged
            });

        };

        //Creación de producto
        let idRandom = Math.floor((Math.random() * 1000) + 21);
        let products = productsController.getProducts();
        let newProduct = {
            "id": idRandom,  //ESTO SE VA A RESOLVER CUANDO USEMOS BD
            "product_name": req.body.product_name || "sin nombre",
            "product_price": req.body.product_price || 0,
            "product_quantity": req.body.product_quantity || 0,
            "product_category": req.body.category,
            "product_image":  req.file ? req.file.filename : "404.jpg",
            "product_description":  req.body.product_description || "sin descripcion",
        }
        //console.log("Aca creo el producto + ", req.body);
        products.push(newProduct);
        //console.log("Aca agrego el producto");
        fs.writeFileSync(productsPath, JSON.stringify(products, null, ' '));
        //console.log("Aca escriubo el producto");
        res.redirect ('/shop')
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
    updateProduct: function (req, res) {
        let productId = req.params.id;
        let products = productsController.getProducts();
        let user_logged = req.session.userLogged;
        products.forEach(function (_product, index) {
            if (_product.id == productId) {
                _product.product_name = req.body.product_name;
                _product.product_price = req.body.product_price;
                _product.product_quantity = req.body.product_quantity;
                _product.product_description = req.body.product_description;
                /*_product.product_category = req.body.category;*/
                _product.product_image = req.body.product_image;
                
                products[index] = _product;
            }
        });

        fs.writeFileSync(productsPath, JSON.stringify(products, null, ' '));

        res.redirect ('/shop')

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
        let productId = req.params.id;
        let products = productsController.getProducts();
        let newProducts = products.filter(product => product.id != productId);
        let user_logged = req.session.userLogged;
        fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, ' '));
        res.redirect ('/shop')
    }
}

module.exports = productsController