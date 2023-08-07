const db = require('../database/models');
const path = require('path');

const {User} = require('../database/models');


const userSessionMiddleware = (req,res,next) =>{
    
    
    res.locals.usuario = false;
    
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        User.findOne({
            where: {
               email: req.cookies.email
            }
        })
        .then(user =>{
            req.session.usuario = user;
            res.locals.usuario = user;
            
            return next();
    
        })
                
    }else{
        return next();
    }
}


module.exports = userSessionMiddleware;




