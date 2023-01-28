const express = require('express');
const app = express();
const PORT = 3002;
const path = require('path');

const mainRoutes = require('./routes/mainRoutes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use('/', mainRoutes);
app.use('/login',mainRoutes);
app.use('/register',mainRoutes);


/*
VIEJO



app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));

});

app.get("/productCart", (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));

});

app.get("/productDetail", (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));

});

app.get("/register", (req, res) => {


    res.sendFile(path.resolve(__dirname, './views/register.html'));

});


*/
app.listen(PORT, () => {

    numeroPuerto = PORT;
    console.log('server listening on ${PORT} cuyo numero es ' + numeroPuerto);

});