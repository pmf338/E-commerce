const fs = require('fs');
const db = require('../database/models');
const sequelize = db.sequelize;
const path = require('path');
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


                return res.redirect('/');

            }).catch(function (error) {
                console.log("error user controler - login", error)
            });




    },



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



            })

    },
    updateUser: function (req, res) {

        User.update({

                name: req.body.user_name_edit,
                surname: req.body.user_surname_edit,
                userName: req.body.user_user_name_edit,
                email: req.body.user_email_edit,
                password: bcrypt.hashSync(req.body.user_password_edit, 10),
                address: req.body.user_address_edit,
                imageProfile: req.file ? req.file.filename : "404.jpg",
                roles_id: req.body.user_category_edit,

            }, {
                where: {

                    id: req.params.id
                }
            })
            .then(() => {

                res.redirect('/profile');
            })
            .catch(function (error) {
                console.log("error user controler - updateUser", error)
            })
    },
    deleteUser: function (req, res) {

    },
    destroyUser: function (req, res) {

    },
}



module.exports = userController;