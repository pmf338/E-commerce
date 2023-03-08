const userSessionMiddleware = (req, res, next) => {
    if (req.cookies && req.cookies.userLogged) {
        res.locals.userLogged = req.cookies.userLogged; //cookie importado de libreria ..?
    } 

    if (req.session && req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged;
    } 
    
    next();
};

module.exports = userSessionMiddleware;