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
    
    login: async function (req, res) {
        
        try{ 
        res.render("users/login", {
            title: "Login"
        })
    
        }catch(result){
        res.status(400).json(result);
        }
        },
        
    processLogin: async function (req, res) {
        try{
        await User.findAll()
            .then((users) => {

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
            })
        }catch(result){
            return res.render(path.resolve(__dirname, '../views/users/login'), {
                errors: [{
                    msg: "Credenciales invalidas"
                }]
            });
        }
    
    },
    contact: async function (req, res) {
        try{
        res.render("users/contact", {
            title: "Contact",
            user: req.session.userLogged
        }
        )}catch(result){
        res.status(400).json(result);
    }
    },
    createUser: async function (req, res) {
        try{
        res.render("users/createProfile", {
            
        })
    }catch(result){
        res.status(400).json(result);
    }
    },
    userProfile: async function (req, res) {
        let userId = req.params.id;
        try{
        let usuarioLogueado = await User.findByPk(userId)
                res.render('users/profile', {
                    usuarioLogueado,
                    title: 'Perfil',
                    user: req.session.userLogged

                })
            
            }catch(result){
                res.status(400).json(result);
            }
    },
    userList: async function (req, res) {
        try{
            let usersList = await User.findAll();
            res.render("users/Users", {
                usersList,
                title : "Usuarios",
                user: req.session.userLogged}
            );
        }catch(result){
            res.status(400).json(result);
        }
    },
    logout: async function (req, res) {
        try{
        req.session.destroy();
        res.cookie('email', null, {
            maxAge: -1
        })
        }catch(result){
        res.status(400).json(result);
        }
        res.redirect('/')
    },
    storeUser: async function (req, res) {
        try{
            
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            
            let errors = validationResult(req);
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
         
        if (!errors.isEmpty()) {
                return res.render("users/createProfile", {
                    success: false,
                    errors: errors.mapped(),
                    validData: req.body
                })
            }
                await User.create({
                name: req.body.user_name,
                surname: req.body.user_surname,
                userName: req.body.user_user_name,
                email: req.body.user_email,
                password: bcrypt.hashSync(req.body.user_pass, 10),
                address: req.body.user_address,
                imageProfile: req.file ? req.file.filename : "404.jpg",
                roles_id: req.body.roles_id ? req.body.roles_id : 2
            });
            res.redirect('/');
        }catch(result){
            res.status(400).json(result);
        }
    },
    editUser: async function (req, res) {
        let userId = req.params.id;
        try{
            let usuario = await User.findByPk(userId);
            res.render("users/editProfile",{
                usuario: {
                    ...usuario.dataValues
                },
                title: "Edición de usuario",
                user: req.session.userLogged}
            );
        }catch(result){
            res.status(400).json(result);
        }
    },
    updateUser: async function (req, res) {
        let userId = req.params.id;
        let usuario = await User.findByPk(userId);
        let newPass = req.body.user_password_edit;
        try{
            await User.update({

                name: req.body.user_name_edit,
                surname: req.body.user_surname_edit,
                userName: req.body.user_user_name_edit,
                email: req.body.user_email_edit,
                password: req.body.user_password_edit ? bcrypt.hashSync(req.body.user_password_edit, 10) : usuario.dataValues.password,
                address: req.body.user_address_edit,
                imageProfile: req.file ? req.file.filename : usuario.dataValues.imageProfile,
                roles_id: req.body.user_category_edit,
            }, {
                where: {

                    id: req.params.id
                }
            });
            res.redirect('/profile')
            
        }catch(result){
            res.status(400).json(result);
        }
    },
    deleteUser: async function (req, res) {
        try{
            await User.destroy({
                where : {
                    id : req.params.id
                }
            })
        }catch(result){
            res.status(400).json(result);
        }
        res.redirect ('/')
    },
    destroyUser: async function (req, res) {
        try{
            await User.destroy({
                where : {
                    id : req.params.id
                }
            })
        }catch(result){
            res.status(400).json(result);
        }
        res.redirect ('/')
    }
}



module.exports = userController;