'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tunjangan extends Model {

    static associate(models) {
      // Tunjangan has many Penggajian (1 to N relationship)
      Tunjangan.hasMany(models.Penggajian, {
        foreignKey: 'id_tunjangan',
        as: 'penggajian',
      });
    }
  }
  Tunjangan.init({
    transport: DataTypes.INTEGER,
    makan: DataTypes.INTEGER,
    komunikasi: DataTypes.INTEGER,
    keahlian: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tunjangan',
    tableName: 'ttunjangan',
  });
  return Tunjangan;
};