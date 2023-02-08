const fs = require ('fs');
const path = require ('path');
const userPath = path.join(__dirname,"./data/users.json");

const userController = {
    home: function (req,res) {
        res.render("index",{lista: users} );
    },
    showUser : function (req,res){
        
    },
    createUser : function (req,res){

    },
    storeUser : function (req,res){
        
    },
    editUser : function (req,res){
        
    },
    updateUser : function (req,res){
        
    },
    deleteUser : function (req,res){
        
    },
    destroyUser : function (req,res){
        
    }
}



modelo.exports = userController