'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {

    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'tadmin',
  });
  return Admin;
};