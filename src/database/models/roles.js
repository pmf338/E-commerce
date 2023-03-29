module.exports = (sequelize, dataTypes) => {

    let alias = "Rol";
    
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
        }

        
    };

    let config = {

        tableName: 'roles',
        underScored: true,
        timeStamps: false
    };

    const role = sequelize.define(alias, cols, config);

    return role;
}