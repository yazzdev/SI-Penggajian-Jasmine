'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penggajian extends Model {

    static associate(models) {
      // Penggajian belongs to Pegawai (N to 1 relationship)
      Penggajian.belongsTo(models.Pegawai, {
        foreignKey: 'nip_pegawai',
        targetKey: 'nip',
        as: 'pegawai',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Penggajian.init({
    total_gaji: DataTypes.BIGINT,
    total_potongan: DataTypes.BIGINT,
    nip_pegawai: DataTypes.STRING,
    take_home_pay: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Penggajian',
    tableName: 'tpenggajian',
  });
  return Penggajian;
};