module.exports = (sequelize, dataTypes) => {

    let alias = "Cart details";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primarykey: true,
            allowNull: false,
            autoIncrement: true

        },

        
    };

    let config = {

        tableName: 'cartDetails',
        underScored: true,
        timeStamps: false
    };

    const cartDetails = sequelize.defined(alias, cols, config);

    return cartDetails;
}