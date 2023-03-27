module.exports = (sequelize, dataTypes) => {

    let alias = "User";
    
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primarykey: true,
            allowNull: false,
            autoIncrement: true

        },

        names: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        surname: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        userName: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        email: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        password: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        address: {

            type: dataTypes.VARCHAR(45),
            allowNull: true
        },

        imageUrl: {
            type: dataTypes.VARCHAR(45),
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

    const user = sequelize.defined(alias, cols, config);

    return user;
}