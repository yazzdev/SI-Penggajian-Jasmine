'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pegawai.init({
    nip: DataTypes.STRING,
    password: DataTypes.STRING,
    nama_pegawai: DataTypes.STRING,
    user_type: DataTypes.STRING,
    tgl_masuk: DataTypes.DATE,
    bank: DataTypes.STRING,
    no_rekening: DataTypes.STRING,
    isActivated: DataTypes.BOOLEAN,
    profilePicture: DataTypes.STRING,
    id_jabatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pegawai',
    tableName: 'tpegawai',
  });
  return Pegawai;
};