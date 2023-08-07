const authMiddleware = (req, res, next) => {
    if (req.session.usuario) {
        return res.redirect('/profile/:id');
    } 
    next();
};

module.exports = authMiddleware;