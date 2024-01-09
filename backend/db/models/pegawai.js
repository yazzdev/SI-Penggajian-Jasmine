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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // Pegawai has one Penggajian (1 to 1 relationship)
      Pegawai.hasOne(models.Penggajian, {
        foreignKey: 'nip_pegawai',
        sourceKey: 'nip',
        as: 'penggajian',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // Pegawai has one Tunjangan (1 to 1 relationship)
      Pegawai.hasOne(models.Tunjangan, {
        foreignKey: 'nip_pegawai',
        sourceKey: 'nip',
        as: 'tunjangan',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // Pegawai has one Potongan (1 to 1 relationship)
      Pegawai.hasOne(models.Potongan, {
        foreignKey: 'nip_pegawai',
        sourceKey: 'nip',
        as: 'potongan',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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