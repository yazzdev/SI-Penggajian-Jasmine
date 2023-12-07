'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleAccess extends Model {

    static associate(models) {
      // define association here
      RoleAccess.belongsTo(models.Role, { foreignKey: 'role_id' });
      RoleAccess.belongsTo(models.Module, { foreignKey: 'module_id' });
    }
  }
  RoleAccess.init({
    role_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER,
    is_read: DataTypes.BOOLEAN,
    is_write: DataTypes.BOOLEAN,
    is_update: DataTypes.BOOLEAN,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RoleAccess',
  });
  return RoleAccess;
};