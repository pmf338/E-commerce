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

            type: dataTypes.STRING(45),
            allowNull: true
        }

        
    };

    let config = {

        tableName: 'categories',
        underScored: true,
        timeStamps: false
    };

    const categories = sequelize.define(alias, cols, config);

    return categories;
}