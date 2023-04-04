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

        name: {

            type: dataTypes.STRING(45),
            allowNull: true
        }
    };

    let config = {
        tableName: 'genre',
        underScored: true,
        timeStamps: false
    };

    const genre = sequelize.define(alias, cols, config);

    return genre;
}