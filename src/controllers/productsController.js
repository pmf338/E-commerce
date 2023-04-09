const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, "../data/products.json");
const {validationResult} = require('express-validator');
const {Product} = require('../database/models');


const productsController = {
    index: function (req, res) {
        Product.findAll()
        .then(productList => {
            res.render("products/index", {
                list : productList,
                title : "Inicio",
                user: req.session.userLogged
            })
        });
    },
    shop: function (req, res) {
        Product.findAll()
        .then(productList => {
            res.render("products/shop", {
                list : productList,
                title : "Tienda",
                user: req.session.userLogged
            })
        });
    },
    showProduct: function (req, res) {
        let productId = req.params.id;
        let emptyList = [];
        Product.findByPk(id)
        .then(producto => {
            res.render("products/shop",{
                title: "Tienda",
                user: req.session.userLogged,
                product : producto,
                list : emptyList
            })
        });
    },
    productDetail: function (req, res) {
        let productId = req.params.id;
        Product.findByPk(productId)
            .then( _product => {
                res.render("products/productDetail", {
                    title: "Producto",
                    product: _product,
                    user: req.session.userLogged
                })
                .catch (function (error) {
                    console.log("error artist controler -", error)
                }) 
            }
            )
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

    editProduct: function (req, res) {
        let productId = req.params.id;
        Product.findByPk(productId)
            .then( _product => {
                res.render("products/editProduct", {
                    title: "Producto",
                    product: _product,
                    user: req.session.userLogged
                })
                .catch (function (error) {
                    console.log("error artist controler -", error)
                }) 
            }
            )
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
    deleteProduct: function (req, res) {
        let productId = req.params.id;
        let _product = productsController.getProducts().find(product => product.id == productId);
        res.render("products/deleteProduct", {
            title: "Delete Producto",
            product: _product,
            user: req.session.userLogged
        });
    },
    destroyProduct: function (req, res) {
        let productId = req.params.id;
        let products = productsController.getProducts();
        let newProducts = products.filter(product => product.id != productId);
        let user_logged = req.session.userLogged;
        fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, ' '));
        res.redirect ('/shop')
    },
    artist: function (req, res) {
        res.render("products/artists", {
            title: "Artistas",
            user: req.session.userLogged
        });
    },
    artistDetail : function (req,res) {
        res.render("products/artistDetail", {
            title: "Artista",
            user: req.session.userLogged
        });
    }
}

  
module.exports = productsController