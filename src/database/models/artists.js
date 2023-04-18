const { Sequelize } = require(".");
const products = require("./products");
const genres = require('./genres');

module.exports = (sequelize, dataTypes) => {
    let alias = "Artist";
    let cols = {
        
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        description : {
            type: dataTypes.STRING(350),
            allowNull: true
        },
        logo : {
            type: dataTypes.STRING(150),
            allowNull: true
        },
        banner : {
            type: dataTypes.STRING(150),
            allowNull: true            
        },
        subscribers : {
            type: dataTypes.STRING(20),
            allowNull: true    
        },
        createdAt : {
            type: dataTypes.DATE,
            allowNull: true    
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true    
        },
    };

    let config = {
        tableName: 'artists',
        underScored: true,
        timeStamps: false
    };

    const Artist = sequelize.define(alias, cols, config);

    Artist.associate = (models) => {
        Artist.hasMany (models.Product, {
            as : '_products',
            foreignKey : 'artist_id'
        });
    };

    Artist.associate = (models) => {
        Artist.belongsTo (models.Genre, {
            as : '_genre',
            foreignKey : 'genre_id'
        })
    };
    
    return Artist;
}