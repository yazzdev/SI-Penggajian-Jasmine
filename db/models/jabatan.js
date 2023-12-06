'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jabatan extends Model {

    static associate(models) {
      // Jabatan belongs to Divisi (N to 1 relationship)
      Jabatan.belongsTo(models.Divisi, {
        foreignKey: 'id_divisi',
        as: 'divisi',
      });

      // Jabatan has many Pegawai (1 to N relationship)
      Jabatan.hasMany(models.Pegawai, {
        foreignKey: 'id_jabatan',
        as: 'pegawai',
      });

      // Jabatan has many Penggajian (1 to N relationship)
      Jabatan.hasMany(models.Penggajian, {
        foreignKey: 'id_jabatan',
        as: 'penggajian',
      });
    }
  }
  Jabatan.init({
    nama_jabatan: DataTypes.STRING,
    biaya_jabatan: DataTypes.INTEGER,
    id_divisi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Jabatan',
    tableName: 'tjabatan',
  });
  return Jabatan;
};