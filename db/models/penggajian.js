'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penggajian extends Model {

    static associate(models) {
      // Penggajian belongs to Jabatan (N to 1 relationship)
      Penggajian.belongsTo(models.Jabatan, {
        foreignKey: 'id_jabatan',
        as: 'jabatan',
      });

      // Penggajian belongs to Pegawai (N to 1 relationship)
      Penggajian.belongsTo(models.Pegawai, {
        foreignKey: 'nip_pegawai',
        targetKey: 'nip_pegawai',
        as: 'pegawai',
      });

      // Penggajian belongs to Tunjangan (N to 1 relationship)
      Penggajian.belongsTo(models.Tunjangan, {
        foreignKey: 'id_tunjangan',
        as: 'tunjangan',
      });

      // Penggajian belongs to Potongan (N to 1 relationship)
      Penggajian.belongsTo(models.Potongan, {
        foreignKey: 'id_potongan',
        as: 'potongan',
      });
    }
  }
  Penggajian.init({
    total_gaji: DataTypes.INTEGER,
    id_tunjangan: DataTypes.STRING,
    id_jabatan: DataTypes.STRING,
    id_potongan: DataTypes.STRING,
    nip_pegawai: DataTypes.STRING,
    take_home_pay: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Penggajian',
    tableName: 'tpenggajian',
  });
  return Penggajian;
};