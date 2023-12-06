'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Potongan extends Model {

    static associate(models) {
      // Potongan has many Penggajian (1 to N relationship)
      Potongan.hasMany(models.Penggajian, {
        foreignKey: 'id_potongan',
        as: 'penggajian',
      });
    }
  }
  Potongan.init({
    makan: DataTypes.INTEGER,
    zakat: DataTypes.INTEGER,
    absensi: DataTypes.INTEGER,
    transport: DataTypes.INTEGER,
    pinjaman_pegawai: DataTypes.INTEGER,
    lain_lain: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Potongan',
    tableName: 'tpotongan',
  });
  return Potongan;
};