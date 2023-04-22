const { Sequelize } = require(".");
const artists = require("./artists");

module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";
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
        tableName: 'genres',
        underScored: true,
        timeStamps: false
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.hasMany (models.Artist, {
            as : '_artist',
            foreignKey : 'genre_id'
        })
    };

    return Genre;
}