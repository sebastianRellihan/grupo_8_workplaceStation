'use strict';
const {
  Model
} = require('sequelize');
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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_photo: DataTypes.STRING,
    address: DataTypes.STRING,
    birth: DataTypes.DATE,
    phone_number: DataTypes.INTEGER,
    gender: DataTypes.TINYINT,
    admin: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};