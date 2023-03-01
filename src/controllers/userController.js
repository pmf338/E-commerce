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
    processLogin: function (req,res) {
        let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        let user = users.find(user => user.user_email == req.body.user);

        if (user){
            req.session.userLogged = user;

            res.redirect('/profile')
        } 

        res.json({
            msg: "Respuesta del process Login",
            data: req.body,
            user
        });

    },
    contact: function (req, res) {
        res.render("users/contact", {
            title: "Contact",
        });
    },
    editProfile: function (req, res) {
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
    profile : function (req,res) {

        res.render('users/profile', {
            title: 'Profile',
            user: req.session.userLogged
        } );
        
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



module.exports = userController;