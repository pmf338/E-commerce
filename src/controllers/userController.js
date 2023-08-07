const fs = require('fs');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
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

        try {
            res.render("users/login", {
                title: "Login"
            })

        } catch (result) {
            res.status(400).json(result);
        }
    },

    processLogin: async function (req, res) {
        try {
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
        } catch (result) {
            return res.render(path.resolve(__dirname, '../views/users/login'), {
                errors: [{
                    msg: "Credenciales invalidas"
                }]
            });
        }

    },
    contact: async function (req, res) {
        try {
            res.render("users/contact", {
                title: "Contact",
                user: req.session.userLogged
            })
        } catch (result) {
            res.status(400).json(result);
        }
    },
    createUser: async function (req, res) {
        try {
            let existingUser = false;
            res.render("users/createProfile", {
                title: "Registro de usuario",
                existingUser: existingUser
            })
        } catch (result) {
            res.status(400).json(result);
        }
    },
    userProfile: async function (req, res) {
        let userId = req.params.id;
        try {
            let usuarioLogueado = await User.findByPk(userId)
            res.render('users/profile', {
                usuarioLogueado,
                title: 'Perfil',
                user: req.session.userLogged

            })

        } catch (result) {
            res.status(400).json(result);
        }
    },
    userList: async function (req, res) {
        console.log("req session", req.session)
        let userId = req.session.usuario.id
        try {
            let usuarioLogueado = await User.findByPk(userId)
            let usersList = await User.findAll();
            res.render("users/Users", {
                usuarioLogueado,
                usersList,
                title: "Usuarios",
                user: req.session.userLogged
            });
        } catch (result) {
            res.status(400).json(result);
        }
    },
    logout: async function (req, res) {
        try {
            req.session.destroy();
            res.cookie('email', null, {
                maxAge: -1
            })
        } catch (result) {
            res.status(400).json(result);
        }
        res.redirect('/')
    },
    storeUser: async function (req, res) {
        let errors = validationResult(req);
        
            if (!errors.isEmpty()) {
                let existingUser = false;
                return res.render("users/createProfile", {
                    success: false,
                    title: "Registro de usuario",
                    errors: errors.mapped(),
                    existingUser: existingUser,
                    validData: req.body
                })
            }

    const foundExistingUser = await User.findOne({
        where: {
            [Op.or]: [
              {
                email: {
                  [Op.like]: req.body.user_email
                }
              },
              {
                userName: {
                  [Op.like]: req.body.user_user_name
                }
              }
            ]
          }
    });  
         
  
      if (foundExistingUser) {
        
        let existingUser = true
        return res.render("users/createProfile", {
            title: "Registro de usuario",
            validData: req.body,
            existingUser: existingUser
        });
      }
      try {
            let active_value;
            if (req.body.user_is_active == true){
                active_value = 1;
            }else{
                active_value = 2;
            }

            await User.create({
                name: req.body.user_name,
                surname: req.body.user_surname,
                userName: req.body.user_user_name,
                email: req.body.user_email,
                password: bcrypt.hashSync(req.body.user_pass, 10),
                address: req.body.user_address,
                imageProfile: req.file ? req.file.filename : "404.jpg",
                roles_id: req.body.roles_id ? req.body.roles_id : 2,
                is_active : active_value,
                createdAt : Date.now(),
                updatedAt : Date.now()
            });
            res.redirect('/');
        } catch (result) {
            res.status(400).json(result);
        }
    },
    editUser: async function (req, res) {
        let userId = req.params.id;
        let existingUser = false;
        try {
            let usuario = await User.findByPk(userId);
            res.render("users/editProfile", {
                validData: {
                    ...usuario.dataValues
                },
                title: "Edición de usuario",
                existingUser: existingUser,
                user: req.session.userLogged
            });
        } catch (result) {
            res.status(400).json(result);
        }
    },
    updateUser: async function (req, res) {
        let userId = req.params.id;
        let usuario = await User.findByPk(userId);
        let newPass = req.body.user_password_edit;
        let errors = validationResult(req);
        let userLog = req.session;
        
            if (!errors.isEmpty()) {
                let existingUser = false;
                if(usuario.dataValues.id == userLog.usuario.id)
                {
                    
                    return res.render("users/editProfile", {
                        success: false,
                        title: "Edición de usuario",
                        errors: errors.mapped(),
                        existingUser: existingUser,
                        validData: req.body,
                        originalData: {
                            ...usuario.dataValues
                        },

                    })
                }else{
                    
                    return res.render("users/editProfile", {
                        success: false,
                        title: "Edición de usuario",
                        errors: errors.mapped(),
                        existingUser: existingUser,
                        validData: req.body,
                        originalData: {
                            ...usuario.dataValues
                        },
                    })

                }
                
            }
        
        try {
            let active_value;
            if (req.body.user_is_active == true){
                active_value = 1;
            }else{
                active_value = 2;
            }

            await User.update({

                name: req.body.user_name_edit,
                surname: req.body.user_surname_edit,
                userName: req.body.user_user_name_edit,
                email: req.body.user_email_edit,
                password: req.body.user_password_edit ? bcrypt.hashSync(req.body.user_password_edit, 10) : usuario.dataValues.password,
                address: req.body.user_address_edit,
                imageProfile: req.file ? req.file.filename : usuario.dataValues.imageProfile,
                is_active : active_value,
                roles_id: req.body.user_category_edit,
            }, {
                where: {

                    id: req.params.id
                }
            });
            res.redirect('/profile/'+ req.params.id)

        } catch (result) {
            res.status(400).json(result);
        }
    },
    destroyUser: async function (req, res) {
        let userLog = req.session;
        try {
            let usuario = await User.findOne({
                where: {id: req.params.id}
            });
            
            if(usuario)
            {
                await usuario.destroy();

                if(usuario.dataValues.id == userLog.usuario.id){
                    req.session.destroy();
                    res.cookie('email', null, {
                    maxAge: -1
            })
                }


            }
            
        } catch (result) {
            res.status(400).json(result);
        }
        res.redirect('/')
    }
}



module.exports = userController;
