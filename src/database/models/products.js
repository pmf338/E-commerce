module.exports = (sequelize, dataTypes) => {

    let alias = "Product";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primarykey: true,
            allowNull: false,
            autoIncrement: true

        },

        sku: {
            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        name: {

            type: dataTypes.VARCHAR(45),
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

            type: dataTypes.VARCHAR(250),
            allowNull: true
        },

        category: {

            type: dataTypes.VARCHAR(45),
            allowNull: false
        },

        imagesUrl: {

            type: dataTypes.VARCHAR(350),
            allowNull: true
        },

        color: {
            type: dataTypes.VARCHAR(45),
            allowNull: true

        },

        size: {

            type: dataTypes.VARCHAR(5),
            allowNull: true
        },

        format: {

            type: dataTypes.VARCHAR(5),
            allowNull: true
        },

        is_active: {

            type: dataTypes.TINYINT,
            allowNull: true
        }


    };

    let config = {

        tableName: 'products',
        underScored: true,
        timeStamps: false
    };

    const product = sequelize.defined(alias, cols, config);

    return product;
}