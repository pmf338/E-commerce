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
        let user = users.find(user => user.user_email == req.body.user && user.user_password == req.body.pass);

        if (user){
            req.session.userLogged = user;
            if (req.body.rememberme) {
                res.cookie(
                    'userLogged',
                    user,
                    {maxAge: 1000 * 60 * 60 * 24 } //Un dia de Login
                );
            }
            res.redirect('/profile')
        }  else {
            console.log("no se inicio sesion", req.body)
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
            user: req.session.userLogged
        });
    },
    editProfile: function (req, res) {
        res.render("users/editProfile", {
            title: "Editar perfil",
            lista: userController.getUsers(),
            user: req.session.userLogged
        });
    },
    createUser: function (req, res) {
        res.render("users/createProfile", {
            title: "Creación de usuario",
            lista: userController.getUsers(),
            user: req.session.userLogged //Siendo Admin puedo crear nuevos usuarios
            //ToDo : EN CASO DE QUE SE QUIERA TRAER ALGUN USUARIO PARA COPIAR SUS PERMISOS
        });
    },
    userProfile : function (req,res) {
        res.render('users/profile', {
            title: 'Profile',
            user: req.session.userLogged
        } );
    },
    logout : function (req,res){
        console.log("cerrar sesion");
        req.session.destroy();
        console.log("retornar");
        return res.redirect('/');
    },
    storeUser : function (req,res){
        //Validación de errores
        let errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.render("users/createProfile", {
                title: "Creación de usuario",
                errors : errors.mapped(),
                user: req.session.userLogged
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
            editing_user : _user,
            user: req.session.userLogged
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