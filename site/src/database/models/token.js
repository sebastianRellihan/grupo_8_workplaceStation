'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.users);
        }
    };
    token.init({
        token: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "user_id",
        }
    }, {
        sequelize,
        modelName: 'token',
    });
    return token;
};