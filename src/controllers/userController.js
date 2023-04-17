const fs = require('fs');
const db = require('../database/models');
const sequelize = db.sequelize;
const {
    validationResult
} = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.TOKEN_SECRET;
const jwtExpirySeconds = process.env.TOKEN_EXPIRY_SECONDS || 300;
require("dotenv").config();
const {
    nextTick
} = require('process');

const {
    User
} = require('../database/models');

const userController = {
    getUsers: function () {
        return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    },
    login: function (req, res) {
        res.render("users/login", {
            title: "Login"
        });

    },
    processLogin: function (req, res) {
        User.findAll()
            .then((users) => {

                let errors = validationResult(req);

                let usuarioLogueado = [];

                if (req.body.email != '' && req.body.pass != '') {
                    usuarioLogueado = users.filter(function (user) {
                        return user.email === req.body.email
                    });

                    if (bcrypt.compareSync(req.body.pass, usuarioLogueado[0].password) === false) {
                        usuarioLogueado = [];
                    }

                }

                if (usuarioLogueado.length === 0) {
                    return res.render(path.resolve(__dirname, '../views/users/login'), {
                        errors: [{
                            msg: "Credenciales invalidas"
                        }]
                    });
                } else {

                    req.session.usuario = usuarioLogueado[0];
                }

                if (req.body.remember_me) {
                    res.cookie('email', usuarioLogueado[0].email, {
                        maxAge: 1000 * 60 * 60 * 24
                    })
                }

                //res.status(200).json({ message: 'Login successful', usuarioLogueado });

                return res.redirect('/contact');

            }).catch(function (error) {
                console.log("error user controler - login", error)
            });

        /*
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role_id: user.roles_id
        };

        
        const token = jwt.sign(payload, jwtSecret, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
        });
        
        
        res.cookie('token', token, { maxAge: jwtExpirySeconds * 10000 });
        
        */


    },


    //METODO UTILIZANDO JSON

    /*
    let users = JSON.pa=rse(fs.readFileSync(usersPath, 'utf-8'));
    let user = users.find(user => user.user_email = req.body.user && bcrypt.compareSync(req.body.pass, user.user_password));

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
        console.log("no se inicio sesion, correo o contraseña incorrectos", req.body)
    }
    
    */
    contact: function (req, res) {
        res.render("users/contact", {
            title: "Contact",
            user: req.session.userLogged
        });
    },
    editProfile: function (req, res) {
        let userId = req.params.id;
        User.findByPk(userId)
            .then(_user => {
                res.render("users/editProfile", {
                    title: "Edición de perfil",
                    usuario: _user,
                    user: req.session.userLogged
                })
            }).catch(function (error) {
                console.log("error user controler - editProfile", error)
            })
    },
    createUser: function (req, res) {
        res.render("users/createProfile", {
            /*title: "Creación de usuario",
            lista: userController.getUsers(),
            user: req.session.userLogged //Siendo Admin puedo crear nuevos usuarios
            //ToDo : EN CASO DE QUE SE QUIERA TRAER ALGUN USUARIO PARA COPIAR SUS PERMISOS*/


        });
    },
    userProfile: function (req, res) {

        let userId = req.params.id;
        User.findByPk(userId)
            .then(usuario => {

                res.render('users/profile', {
                    title: 'Perfil',
                    user: req.session.userLogged

                })
            }).catch(function (error) {
                console.log("error user controler -", error)

            });
    },
    logout: function (req, res) {
        req.session.destroy();
        res.cookie('email', null, {
            maxAge: -1
        });
        res.redirect('/')
    },
    storeUser: function (req, res) {

        const newUser = {

            name: req.body.user_name,
            surname: req.body.user_surname,
            userName: req.body.user_user_name,
            email: req.body.user_email,
            password: bcrypt.hashSync(req.body.user_pass, 10),
            address: req.body.user_address,
            imageProfile: req.file ? req.file.filename : "404.jpg",
            roles_id: req.body.roles_id ? req.body.roles_id : 2
        }

        console.log("newUser = ", newUser);

        User.create(newUser)
            .then(() => {

                res.redirect('/');
            })
            .catch(function (error) {
                console.log("error user controler -", error)
            })



        //METODO UTILIZANDO JSON


        /*
        let idRandom = Math.floor((Math.random() * 1000) + 21); //Id random
        let users = userController.getUsers();
        let newUser = {
            "id" : idRandom,
            "user_name" : req.body.user_name,
            "user_surname": req.body.user_surname,
            "user_user_name": req.body.user_user_name,
            "user_email" : req.body.user_email,
            "user_password" : bcrypt.hashSync(req.body.user_pass, 10),
            "user_category" : req.body.user_category,
            "user_image" : req.file ? req.file.filename : "404.jpg",
            "user_address" : req.body.user_address

        }
        
        
        users.push(newUser);
        fs.writeFileSync(usersPath,JSON.stringify(users,null,' '));
        res.redirect('/');
        */

    },
    editUser: function (req, res) {
        let userId = req.params.id;
        User.findByPk(userId)
            .then(usuario => {

                res.render("users/editProfile", {
                    usuario: {

                        ...usuario.dataValues

                    }
                })



                /*{   title: "Edición de usuario",
                    editing_user : usuario,
                    user: req.session.userLogged
                })
                */
            })

    },
    updateUser: function (req, res) {

        User.update({

                user_name_edit: req.body.user_name,
                user_surname_edit: req.body.user_surname,
                user_user_name_edit: req.body.user_user_name,
                user_email_edit: req.body.user_email,
                user_password_edit: bcrypt.hashSync(req.body.user_pass, 10),
                user_address_edit: req.body.user_address,
                user_image_edit: req.file ? req.file.filename : "404.jpg",
                user_category_edit: req.body.user_category_edit,
                roles_id: 2
            }, {
                where: {

                    id: req.params.id
                }
            })
            .then(() => {

                res.redirect('/profile');
            })
            .catch(function (error) {
                console.log("error user controler -", error)
            })
    },
    deleteUser: function (req, res) {

    },
    destroyUser: function (req, res) {

    },
}



module.exports = userController;