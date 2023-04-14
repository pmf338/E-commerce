module.exports = (sequelize, dataTypes) => {

    let alias = "User";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        name: {

            type: dataTypes.STRING(150),
            allowNull: true
        },

        surname: {

            type: dataTypes.STRING(100),
            allowNull: true
        },

        userName: {

            type: dataTypes.STRING(100),
            allowNull: false
        },

        email: {

            type: dataTypes.STRING(100),
            allowNull: false
        },

        password: {

            type: dataTypes.STRING(100),
            allowNull: false
        },

        address: {

            type: dataTypes.STRING(100),
            allowNull: true
        },

        imageProfile: {
            type: dataTypes.STRING(150),
            allowNull: true

        },

        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },

        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        }

    };

    let config = {

        tableName: 'users',
        underScored: true,
        timeStamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo (models.Rol, {
            as : '_rol',
            foreignKey : 'roles_id'
        })
    };

    return User;
}