module.exports = (sequelize, dataTypes) => {

    let alias = "Cart details";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        
    };

    let config = {

        tableName: 'cartDetails',
        underScored: true,
        timeStamps: false
    };

    const cartDetails = sequelize.define(alias, cols, config);

    return cartDetails;
}