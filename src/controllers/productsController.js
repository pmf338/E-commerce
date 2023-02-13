const fs = require ('fs');
const path = require ('path');
const productsPath = path.join(__dirname,"../data/products.json");



const productsController = {
    getProducts: function (){
        return JSON.parse(fs.readFileSync(productsPath,'utf-8'));
    },
    index: function (req,res) {
        res.render("products/index",{
            title : "Listado productos",
            lista: productsController.getProducts()
        });
    },
    shop: function (req,res) {
        res.render("products/shop",{
            title : "Listado productos",
            lista: productsController.getProducts()
        });
    },
    showProduct : function (req,res){
        let productId = req.params.id;
        let _product = productsController.getProducts().find(product => product.id == productId);
        res.render("products/shop",{
            title : "Producto",
            product : _product
        });
    },
    productDetail : function (req,res){
        let productId = req.params.id;
        let _product = productsController.getProducts().find(product => product.id == productId);
        res.render("products/productDetail",{
            title : "Producto",
            product : _product
        });
    },
    createProduct : function (req,res){
        res.render("products/createProduct",{
            title : "Creación de producto",
    });
},
    storeProduct : function (req,res){
        
    },
    editProduct : function (req,res){
        let productId = req.params.id;
        let _product = productsController.getProducts().find(product => product.id == productId);
        res.render("products/editProduct",{
            title : "Producto",
            product : _product
        });
    },
    updateProduct : function (req,res){
        let productId = req.params.id;
        let _product = productsController.getProducts().find(product => product.id == productId);

        _product.product_name = req.body.name;
        _product.product_price = req.body.name;

    },
    deleteProduct : function (req,res){
        
    },
    destroyProduct : function (req,res){
        
    },
}



module.exports = productsController