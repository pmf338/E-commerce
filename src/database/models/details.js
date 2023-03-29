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
            type: dataTypes.STRING(45),
            allowNull: true
        },

        price: {

            type: dataTypes.DECIMAL(6, 2),
            allowNull: true
        },

        detailsCol: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        
    };

    let config = {

        tableName: 'Details',
        underScored: true,
        timeStamps: false
    };

    const detail = sequelize.define(alias, cols, config);

    return detail;
}