const fs = require ('fs');
const path = require ('path');
const productsPath = path.join(__dirname,"./data/products.json");

const productController = {
    getProducts: function (){
        return JSON.parse(fs.readFileSync(productsPath,'utf-8'));
    },
    home: function (req,res) {
        res.render("index",{lista: productos});
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



modelo.exports = productController