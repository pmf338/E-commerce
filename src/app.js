const express = require('express');
const app = express();
const PORT = 3002;
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productsRoutes');
const userRoutes = require ('./routes/usersRoutes');

app.use(express.static(__dirname + '../../public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/', productRoutes);
app.use('/login',mainRoutes);
app.use('/register',mainRoutes);
app.use('/shop', productRoutes);
app.use('/shop/:id', mainRoutes);
app.use('/productDetail', mainRoutes);
app.use('/createProduct', mainRoutes);
app.use('/editProduct',mainRoutes);
app.use('/contact', mainRoutes);
app.use(function(req,res){
    res.status(404).render('404',{
        title : '404'
    })
});

app.listen(PORT, () => {
    numeroPuerto = PORT;
    console.log('server listening on ${PORT} cuyo numero es ' + numeroPuerto);

});