const { Sequelize } = require(".");
const artists = require("./artists");

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
            type: dataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(150),
            allowNull: true
        },
        price: {
            type: dataTypes.DECIMAL(6,2),
            allowNull: true
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: dataTypes.STRING(450),
            allowNull: true
        },
        size: {
            type: dataTypes.STRING(5),
            allowNull: true
        },
        format: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        is_active: {
            type: dataTypes.TINYINT,
            allowNull: false
        },
        createdAt: {
            type : dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type : dataTypes.DATE,
            allowNull: false
        },
        imagePrimary: {
            type: dataTypes.STRING(150),
            allowNull: true
        },
        imageSecond: {
            type: dataTypes.STRING(150),
            allowNull: true
        },
        imageThird: {
            type: dataTypes.STRING(150),
            allowNull: true
        }
    };

    let config = {
        tableName: 'products',
        underScored: true,
        timeStamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo (models.Artist, {
            as : '_artist',
            foreignKey : 'artist_id'
        })
    };
    Product.associate = (models) => {
        Product.belongsTo (models.Category, {
            as : '_category',
            foreignKey : 'categories_id'
        })
    };

    return Product;
};

    
