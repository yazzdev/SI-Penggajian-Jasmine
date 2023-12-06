'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penggajian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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