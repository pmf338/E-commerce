const db = require('../database/models');
const path = require('path');

const {User} = require('../database/models');


module.exports = (req, res, next) => {
    
    res.locals.user = false;

    if(req.session.user){

        res.locals.user = req.session.user;
        return next();
    
    }else if(req.cookies.email){

        User.findOne({

            where : {

                email: req.cookies.email
            }
        })
        .then(user =>{

            req.session.user = user;
            req.local.user = user;

            return next();
        
        }).catch (function (error) {
            console.log("error userSession middleware -", error)
        })
    }

}


/*
const userSessionMiddleware = (req,res,next) => {

    if (req.cookies && req.cookies.userLogged) {
        res.locals.userLogged = req.cookies.userLogged; //cookie importado de libreria ..?
    } 

    if (req.session && req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged;
    } 
    
    next();

}

module.exports = userSessionMiddleware;
 */  


