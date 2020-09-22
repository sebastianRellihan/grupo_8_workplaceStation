'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.product);
            this.belongsToMany(models.user, { through: models.categoryUser });
        }
    };
    category.init({
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'category',
    });
    return category;
};