'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    users.init({
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "first_name"
        },
        ["last-name"]: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: "last_name"
        },
        ["user-name"]: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            field: "user_name"
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        ["profile-photo"]: {
            type: DataTypes.STRING(50),
            unique: true,
            field: "profile_photo"
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        ["phone-number"]: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            field : "phone_number"
        },
        gender: {
            type: DataTypes.TINYINT.UNSIGNED,
            defaultValue: 3
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            field: "admin",
        }
    }, {
        sequelize,
        modelName: 'user',
    });
    return users;
};