'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {

    static associate(models) {
      // define association here
      Module.belongsToMany(models.Role, { through: 'RoleAccess', foreignKey: 'module_id' });
    }
  }
  Module.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};