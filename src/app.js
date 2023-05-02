const express = require('express');
const app = express();
const PORT = 3002;
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const methodOverride = require('method-override');
const userSessionMiddleware = require('./middlewares/userSessionMiddleware');

//Rutas de las API
const apiArtistsRoutes = require('../src/routes/api/apiArtistsRoutes');
const apiProductsRoutes = require('../src/routes/api/apiProductsRoutes');

//Middlewares

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    //cookie: { maxAge: 60000 } //60 segundos cookie de express session diferente a cookie parser, borrar luego al hacer cookie parser
}));

app.use(express.static(__dirname + '../../public'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(express.urlencoded({extended: true})); //Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.json());
app.use(methodOverride('_method')); //Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios

app.use(userSessionMiddleware); //Para verificar si el usuario esta o no logeado

app.use('/', productRoutes);
app.use('/', usersRoutes);
app.use(apiArtistsRoutes);
app.use(apiProductsRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');




// Desactivamos el 404 para identificar los errores posibles
/*app.use(function(req,res){
    res.status(404).render('404',{
        title : '404'
    })
}); */

app.listen(PORT, () => {
    numeroPuerto = PORT;
    console.log('server listening on ${PORT} cuyo numero es ' + numeroPuerto);

});