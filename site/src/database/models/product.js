'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.image);
            this.belongsTo(models.category);
            this.belongsToMany(models.purchase, { through: 'products_purchases' });
        }
    };
    product.init({
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        briefDescription: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: "brief_description"
        },
        aditionalInfo: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: "aditional_info"
        },
        price: {
            type: DataTypes.DECIMAL(2, 10).UNSIGNED,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        stock: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'product',
    });
    return product;
};