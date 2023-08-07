const guestMiddlewareAdmin = (req, res, next) => {
    
if (req.session.usuario) {
    if ( res.locals.usuario.roles_id == 1 ) {
        next();
    } else {
        return res.redirect('/login');
    }
} else {
    return res.redirect('/login');
}
    
};

module.exports = guestMiddlewareAdmin;