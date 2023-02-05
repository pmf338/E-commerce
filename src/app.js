const express = require('express');
const app = express();
const PORT = 3002;
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');

app.use(express.static(__dirname + '../../public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/', mainRoutes);
app.use('/login',mainRoutes);
app.use('/register',mainRoutes);
app.use('/shop', mainRoutes);
app.use('/shop/:id', mainRoutes);
app.use('/productDetail', mainRoutes);
app.use('/createProduct', mainRoutes);
app.use('/contact', mainRoutes);


app.listen(PORT, () => {
    numeroPuerto = PORT;
    console.log('server listening on ${PORT} cuyo numero es ' + numeroPuerto);

});