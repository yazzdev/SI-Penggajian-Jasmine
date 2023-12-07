'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      // define association here
      Role.hasMany(models.Pegawai, { foreignKey: 'role_id' });

      Role.belongsToMany(models.Module, { through: 'RoleAccess', foreignKey: 'role_id' });
    }
  }
  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};