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