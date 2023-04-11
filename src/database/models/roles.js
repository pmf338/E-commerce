module.exports = (sequelize, dataTypes) => {

    let alias = "Rol";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        description: {

            type: dataTypes.STRING(100),
            allowNull: true
        }

        
    };

    let config = {

        tableName: 'roles',
        underScored: true,
        timeStamps: false
    };

    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) => {
        Rol.hasMany (models.User, {
            as : '_users',
            foreignKey : 'roles_id'
        });
    };

    return Rol;
}