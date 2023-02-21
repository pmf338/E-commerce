const fs = require ('fs');

const userController = {
    login: function (req,res) {
        res.render("users/login",{
            title: "Login"
        });
    }
    /*showUser : function (req,res){
        
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
        
    }*/
}



module.exports = userController;