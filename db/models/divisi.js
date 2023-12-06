'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Divisi extends Model {

    static associate(models) {
      // Divisi has many Jabatan (1 to N relationship)
      Divisi.hasMany(models.Jabatan, {
        foreignKey: 'id_divisi',
        as: 'jabatan',
      });
    }
  }
  Divisi.init({
    nama_divisi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Divisi',
    tableName: 'tdivisi',
  });
  return Divisi;
};