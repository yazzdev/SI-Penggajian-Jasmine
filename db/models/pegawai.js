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

      Pegawai.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
  }
  Pegawai.init({
    nip: DataTypes.STRING,
    password: DataTypes.STRING,
    nama_pegawai: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    user_type: DataTypes.STRING,
    tgl_masuk: DataTypes.DATE,
    bank: DataTypes.STRING,
    no_rekening: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    id_jabatan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pegawai',
    tableName: 'tpegawai',
  });
  return Pegawai;
};