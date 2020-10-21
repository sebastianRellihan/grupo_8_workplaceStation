'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class productPurchase extends Model {
        /**
         * Asociaciones
         */
        static associate(models) {
            this.belongsTo(models.purchase);
        }
    };
    productPurchase.init({
        purchaseId: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "purchase_id",
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: "product_id",
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'productPurchase',
        tableName: 'products_purchases'
    });
    return productPurchase;
};