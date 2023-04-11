module.exports = (sequelize, dataTypes) => {

    let alias = "Detail";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true
        },

        price: {

            type: dataTypes.DECIMAL(6, 2),
            allowNull: true
        }, 
    };

    let config = {

        tableName: 'Details',
        underScored: true,
        timeStamps: false
    };

    const Detail = sequelize.define(alias, cols, config);

    return Detail;
};

    
