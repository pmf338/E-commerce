let productos = [
    {
        id: 1,
        name: "Vinilo",
        price: "$2.000",
        quantity: 10,
        image: "",
        description:"El mejor vinilo blanco",
    },
    {
        id: 2,
        name: "Dvd",
        price: "$3.000",
        quantity: 20,
        image: "",
        description:"El mejor dvd blanco",
    },
    {
        id: 3,
        name: "camisa",
        price: "$13.000",
        quantity: 100,
        image: "",
        description:"la mejor camisa blanco",
    }
];


const mainController = {

    index: function (req,res) {
        res.render("index",{lista: productos} );

    },

    login: function (req,res) {
        res.render("login");

    },

    productCart: function (req,res) {
        res.render("productCart");

    },

    productDetail: function (req,res) {
        res.render("productDetail");

    },

    register: function (req,res) {
        res.render("register");

    },

    shop: function (req,res) {
        res.render("shop");

    },

}

module.exports = mainController;