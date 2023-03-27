module.exports = (sequelize, dataTypes) => {

    let alias = "Category";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primarykey: true,
            allowNull: false,
            autoIncrement: true

        },

        description: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        }

        
    };

    let config = {

        tableName: 'categories',
        underScored: true,
        timeStamps: false
    };

    const categories = sequelize.defined(alias, cols, config);

    return categories;
}