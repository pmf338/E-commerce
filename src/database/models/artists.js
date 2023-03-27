module.exports = (sequelize, dataTypes) => {

    let alias = "Artist";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primarykey: true,
            allowNull: false,
            autoIncrement: true

        },

        name: {
            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        description: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        imagesUrl: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        
    };

    let config = {

        tableName: 'artists',
        underScored: true,
        timeStamps: false
    };

    const artist = sequelize.defined(alias, cols, config);

    return artist;
}