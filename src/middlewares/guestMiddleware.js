const guestMiddleware = (req, res, next) => {

    if (!req.cookies.email && !req.session.usuario) {
        return res.redirect('/login');
    } 
    next();
};

module.exports = guestMiddleware;