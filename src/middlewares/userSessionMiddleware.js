const userSessionMiddleware = (req, res, next) => {
    if (req.session && req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged;
    } 
    next();
};

module.exports = userSessionMiddleware;