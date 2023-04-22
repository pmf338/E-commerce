const { Sequelize } = require(".");
const products = require('./products');

module.exports = (sequelize, dataTypes) => {

    let alias = "Category";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        description: {

            type: dataTypes.STRING(50),
            allowNull: true
        }

        
    };

    let config = {

        tableName: 'categories',
        underScored: true,
        timeStamps: false
    };

    const Categories = sequelize.define(alias, cols, config);

    Categories.associate = (models) => {
        Categories.hasMany (models.Product, {
            as : '_products',
            foreignKey : 'categories_id'
        });
    };

    return Categories;
}