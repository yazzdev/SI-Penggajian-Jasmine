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
    transport: DataTypes.BIGINT,
    makan: DataTypes.BIGINT,
    komunikasi: DataTypes.BIGINT,
    keahlian: DataTypes.BIGINT,
    nip_pegawai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tunjangan',
    tableName: 'ttunjangan',
  });
  return Tunjangan;
};