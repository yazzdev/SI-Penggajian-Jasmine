'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tunjangan extends Model {

    static associate(models) {
      // Tunjangan belongs to Pegawai (N to 1 relationship)
      Tunjangan.belongsTo(models.Pegawai, {
        foreignKey: 'nip_pegawai',
        targetKey: 'nip',
        as: 'pegawai',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Tunjangan.init({
    transport: DataTypes.INTEGER,
    makan: DataTypes.INTEGER,
    komunikasi: DataTypes.INTEGER,
    keahlian: DataTypes.INTEGER,
    nip_pegawai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tunjangan',
    tableName: 'ttunjangan',
  });
  return Tunjangan;
};