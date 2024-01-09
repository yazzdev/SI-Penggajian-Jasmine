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
    makan: DataTypes.INTEGER,
    zakat: DataTypes.INTEGER,
    absensi: DataTypes.INTEGER,
    transport: DataTypes.INTEGER,
    pinjaman_pegawai: DataTypes.INTEGER,
    lain_lain: DataTypes.INTEGER,
    nip_pegawai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Potongan',
    tableName: 'tpotongan',
  });
  return Potongan;
};