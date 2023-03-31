module.exports = (sequelize, dataTypes) => {

    let alias = "Artist";
    
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
        },

        description: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        imagesUrl: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        
    };

    let config = {

        tableName: 'artists',
        underScored: true,
        timeStamps: false
    };

    const artist = sequelize.define(alias, cols, config);

    return artist;
}