const fs = require ('fs');
const path = require('path');
const usersPath = path.join(__dirname, "../data/users.json");

const userController = {
    getUsers: function () {
        return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    },
    login: function (req,res) {
        res.render("users/login",{
            title: "Login"
        });
    },
    contact: function (req, res) {
        res.render("users/contact", {
            title: "Contact",
        });
    },
    profile: function (req, res) {
        res.render("users/editProfile", {
            title: "Editar perfil",
            lista: userController.getUsers()
        });
    },
    createProfile: function (req, res) {
        res.render("users/createProfile", {
            title: "Crear perfil",
            lista: userController.getUsers()
        });
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
        
    },
}



module.exports = userController