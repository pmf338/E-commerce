const express = require('express');
const app = express();
const PORT = 3002;
const path = require('path');


const productRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const methodOverride = require('method-override');

app.use(express.static(__dirname + '../../public'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/', productRoutes);
app.use('/', usersRoutes);


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