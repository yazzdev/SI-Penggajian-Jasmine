'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jabatan extends Model {

    static associate(models) {
      // Jabatan has many Pegawai (1 to N relationship)
      Jabatan.hasMany(models.Pegawai, {
        foreignKey: 'id_jabatan',
        as: 'pegawai',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // Jabatan has many Penggajian (1 to N relationship)
      Jabatan.hasOne(models.Penggajian, {
        foreignKey: 'id_jabatan',
        sourceKey: 'id',
        as: 'penggajian',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  Jabatan.init({
    nama_divisi: DataTypes.STRING,
    nama_jabatan: DataTypes.STRING,
    biaya_jabatan: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Jabatan',
    tableName: 'tjabatan',
  });
  return Jabatan;
};