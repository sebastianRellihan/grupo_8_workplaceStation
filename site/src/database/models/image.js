'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    image.init({
        url: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'image',
    });
    return image;
};