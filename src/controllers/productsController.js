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
        
    },
    createProduct : function (req,res){

    },
    storeProduct : function (req,res){
        
    },
    editProduct : function (req,res){
        
    },
    updateProduct : function (req,res){
        
    },
    deleteProduct : function (req,res){
        
    },
    destroyProduct : function (req,res){
        
    }
}



module.exports = productsController