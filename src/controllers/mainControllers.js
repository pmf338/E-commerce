let productos = [
    {
        id: 1,
        name: "Vinilo Bowie Vinyl",
        price: "$2.000",
        quantity: 10,
        image: "bowie-vinyl.jpeg",
        description:"El mejor vinilo blanco",
    },
    {
        id: 2,
        name: "Dvd Queen",
        price: "$3.000",
        quantity: 20,
        image: "dvd.webp",
        description:"El mejor dvd blanco",
    },
    {
        id: 3,
        name: "Camisa RadioHead",
        price: "$13.000",
        quantity: 100,
        image: "rh-shirt.webp",
        description:"la mejor camisa blanco",
    }
];


const mainController = {
    index: function (req,res) {
        res.render("index",{
            title : "Listado productos",
            lista: productController.getProducts()
        });
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
        let shop = productos.find (producto => producto.id == req.params.id);
        res.render("shop",{lista: productos} );

    },
    createproduct: function (req,res) {
        res.render("createProduct");

    },
    editproduct: function (req,res) {
        res.render("editProduct");

    },

    contact: function (req,res) {
        res.render("contact");

    },

}

module.exports = mainController;