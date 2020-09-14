'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class purchase extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    purchase.init({
        purchasedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "purchased_at"
        },
        totalValue: {
            type: DataTypes.DECIMAL(2, 10).UNSIGNED,
            allowNull: false,
            field: "total_value"
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "shipping_address"
        },
        shippingId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "shipping_id"
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: "user_id"
        }
    }, {
        sequelize,
        modelName: 'purchase',
    });
    return purchase;
};