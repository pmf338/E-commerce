module.exports = (sequelize, dataTypes) => {

    let alias = "Genre";
    
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
        }

        
    };

    let config = {

        tableName: 'genre',
        underScored: true,
        timeStamps: false
    };

    const genre = sequelize.defined(alias, cols, config);

    return genre;
}