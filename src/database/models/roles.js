module.exports = (sequelize, dataTypes) => {

    let alias = "Rol";
    
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

        tableName: 'roles',
        underScored: true,
        timeStamps: false
    };

    const role = sequelize.defined(alias, cols, config);

    return role;
}