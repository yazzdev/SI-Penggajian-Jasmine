'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Potongan extends Model {

    static associate(models) {
      // Potongan belongs to Pegawai (N to 1 relationship)
      Potongan.belongsTo(models.Pegawai, {
        foreignKey: 'nip_pegawai',
        targetKey: 'nip',
        as: 'pegawai',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Potongan.init({
    makan: DataTypes.BIGINT,
    zakat: DataTypes.BIGINT,
    absensi: DataTypes.BIGINT,
    transport: DataTypes.BIGINT,
    pinjaman_pegawai: DataTypes.BIGINT,
    lain_lain: DataTypes.BIGINT,
    nip_pegawai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Potongan',
    tableName: 'tpotongan',
  });
  return Potongan;
};