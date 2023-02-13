const express = require('express');
const app = express();
const PORT = 3002;
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productsRoutes');
const usersRoutes = require ('./routes/usersRoutes');

app.use(express.static(__dirname + '../../public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/', productRoutes);
app.use('/login',usersRoutes);
app.use('/register',usersRoutes);
app.use('/shop', productRoutes);
app.use('/shop/:id', productRoutes);
app.use('/productDetail', productRoutes);
app.use('/shop/createProduct', productRoutes);
app.use('/editProduct', productRoutes);
app.use('/contact', usersRoutes);
app.use(function(req,res){
    res.status(404).render('404',{
        title : '404'
    })
});

app.listen(PORT, () => {
    numeroPuerto = PORT;
    console.log('server listening on ${PORT} cuyo numero es ' + numeroPuerto);

});