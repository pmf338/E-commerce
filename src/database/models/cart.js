module.exports = (sequelize, dataTypes) => {

    let alias = "Cart";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primarykey: true,
            allowNull: false,
            autoIncrement: true

        },

        status: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        billCode: {

            type: dataTypes.INTEGER,
            allowNull: true
        },

        createDate: {

            type: dataTypes.DATE,
            allowNull: true
        },

        cartCol: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        totalPrice: {

            type: dataTypes.DECIMAL(6, 2),
            allowNull: true
        },

        subTotalPrice: {

            type: dataTypes.DECIMAL(6, 2),
            allowNull: true
        },

        dateRequest: {
            type: dataTypes.DATETIME,
            allowNull: true

        },

        dateDelivery: {

            type: dataTypes.DATE,
            allowNull: true
        },


    };

    let config = {

        tableName: 'cart',
        underScored: true,
        timeStamps: false
    };

    const cart = sequelize.defined(alias, cols, config);

    return cart;
}