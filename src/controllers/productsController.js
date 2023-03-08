const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, "../data/products.json");

const {validationResult} = require('express-validator');



const productsController = {
    getProducts: function () {
        return JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    },
    index: function (req, res) {
        res.render("products/index", {
            title: "Listado productos",
            lista: productsController.getProducts()
        });
    },
    shop: function (req, res) {
        res.render("products/shop", {
            title: "Listado productos",
            lista: productsController.getProducts()
        });
    },
    showProduct: function (req, res) {
        let productId = req.params.id;
        let _product = productsController.getProducts().find(product => product.id == productId);
        res.render("products/shop", {
            title: "Producto",
            product: _product
        });
    },
    productDetail: function (req, res) {
        let productId = req.params.id;
        let _product = productsController.getProducts().find(product => product.id == productId);
        res.render("products/productDetail", {
            title: "Producto",
            product: _product
        });
    },
    createProduct: function (req, res) {
        res.render("products/createProduct", {
            title: "Creación de producto",
        });
    },
    storeProduct: function (req, res) {
        
        //Validación de errores
        let errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.render("products/createProduct", {
                title: "Creación de producto",
                errors : errors.mapped()
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
        let _product = productsController.getProducts().find(product => product.id == productId);
        res.render("products/editProduct", {
            title: "Producto",
            product: _product
        });
    },
    updateProduct: function (req, res) {
        let productId = req.params.id;
        let products = productsController.getProducts();
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
            product: _product
        });
    },
    destroyProduct: function (req, res) {
        let productId = req.params.id;
        let products = productsController.getProducts();
        
        let newProducts = products.filter(product => product.id != productId);


        fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, ' '));
        res.redirect ('/shop')
    },
    artist: function (req, res) {
        res.render("products/artist", {
            title: "Artistas",
        });
},
}


module.exports = productsController