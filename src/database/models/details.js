module.exports = (sequelize, dataTypes) => {

    let alias = "Detail";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primarykey: true,
            allowNull: false,
            autoIncrement: true

        },

        quantity: {
            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        price: {

            type: dataTypes.DECIMAL(6, 2),
            allowNull: true
        },

        detailsCol: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        
    };

    let config = {

        tableName: 'Details',
        underScored: true,
        timeStamps: false
    };

    const detail = sequelize.defined(alias, cols, config);

    return detail;
}