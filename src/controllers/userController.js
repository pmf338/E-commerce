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
    createUser: function (req, res) {
        res.render("users/createProfile", {
            title: "Creación de usuario",
            lista: userController.getUsers() //EN CASO DE QUE SE QUIERA TRAER ALGUN USUARIO PARA COPIAR SUS PERMISOS
        });
    },
    storeUser : function (req,res){
        //Validación de errores
        let errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.render("users/createProfile", {
                title: "Creación de usuario",
                errors : errors.mapped()
            });
        };
        //Guardado del usuario
        let idRandom = Math.floor((Math.random() * 1000) + 21); //Id random
        let users = userController.getUsers();
        let newUser = {
            "id" : idRandom,
            "user_name" : req.body.user_name,
            "user_email" : req.body.user_email,
            "user_password" : req.body.user_pass,
            "user_category" : req.body.user_category,
            "user_image" : req.file.filename,
        }
        console.log("Guardado del usuario : ",req.body.user_name);
        users.push(newUser);
        fs.writeFileSync(usersPath,JSON.stringify(users,null,' '));
        res.redirect('/');
    },
    editUser : function (req,res){
        let userId = req.params.id;
        let _user = userController.getUsers().find(user => user.id == userId);
        res.render("users/editProfile",{
            title: "User",
            user : _user
        })
    },
    updateUser : function (req,res){
        
    },
    deleteUser : function (req,res){
        
    },
    destroyUser : function (req,res){
        

    },

}



module.exports = userController;