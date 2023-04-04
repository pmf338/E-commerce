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
        descrption: {
            type: dataTypes.STRING(50),
            allowNull: true
        }
    };

    let config = {
        tableName: 'genre',
        underScored: true,
        timeStamps: false
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.hasMany (models.Artist, {
            as : '_artists',
            foreignKey : 'genre_id'
        })
    };

    return Genre;
}