module.exports = (sequelize, dataTypes) => {

    let alias = "User";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        names: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        surname: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        userName: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        email: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        password: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        address: {

            type: dataTypes.STRING(45),
            allowNull: true
        },

        imageUrl: {
            type: dataTypes.STRING(45),
            allowNull: true

        },

        roles_id: {

            type: dataTypes.INTEGER,
            allowNull: false
        },


    };

    let config = {

        tableName: 'users',
        underScored: true,
        timeStamps: false
    };

    const user = sequelize.define(alias, cols, config);

    return user;
}