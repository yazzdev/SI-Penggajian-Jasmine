'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pegawai extends Model {

    static associate(models) {
      // Pegawai belongs to Jabatan (N to 1 relationship)
      Pegawai.belongsTo(models.Jabatan, {
        foreignKey: 'id_jabatan',
        as: 'jabatan',
      });

      // Pegawai has one Penggajian (1 to 1 relationship)
      Pegawai.hasOne(models.Penggajian, {
        foreignKey: 'nip_pegawai',
        sourceKey: 'nip',
        as: 'penggajian',
      });
    }
  }
  Pegawai.init({
    nip: DataTypes.STRING,
    nama_pegawai: DataTypes.STRING,
    tgl_masuk: DataTypes.DATE,
    bank: DataTypes.STRING,
    no_rekening: DataTypes.STRING,
    id_jabatan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pegawai',
    tableName: 'tpegawai',
  });
  return Pegawai;
};