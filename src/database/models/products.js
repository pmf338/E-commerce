module.exports = (sequelize, dataTypes) => {

    let alias = "Product";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        sku: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        name: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        price: {
            type: dataTypes.DECIMAL(6, 2),
            allowNull: true
        },

        quantity: {

            type: dataTypes.INTEGER,
            allowNull: true
        },

        description: {

            type: dataTypes.STRING(250),
            allowNull: true
        },

        category: {

            type: dataTypes.STRING(45),
            allowNull: false
        },

        imagesUrl: {

            type: dataTypes.STRING(350),
            allowNull: true
        },

        color: {
            type: dataTypes.STRING(45),
            allowNull: true

        },

        size: {

            type: dataTypes.STRING(5),
            allowNull: true
        },

        format: {

            type: dataTypes.STRING(5),
            allowNull: true
        },

        is_active: {

            type: dataTypes.TINYINT,
            allowNull: true
        },

        createdAt : {
            type : dataTypes.DATE,
            allowNull: false
        },

        updatedAt : {
            type : dataTypes.DATE,
            allowNull: false
        }

    };

    let config = {

        tableName: 'products',
        underScored: true,
        timeStamps: false
    };

    const product = sequelize.define(alias, cols, config);

    return product;
}