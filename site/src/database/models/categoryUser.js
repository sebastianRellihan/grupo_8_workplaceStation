'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoryUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  categoryUser.init({
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field : "category_id"
  },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field : "user_id"
  }
  }, {
    sequelize,
    modelName: 'categoryUser',
    tableName: 'categories_users'
  });
  return categoryUser;
};