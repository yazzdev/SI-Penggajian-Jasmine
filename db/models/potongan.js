'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Potongan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Potongan.init({
    id: DataTypes.STRING,
    makan: DataTypes.INTEGER,
    zakat: DataTypes.INTEGER,
    absensi: DataTypes.INTEGER,
    transport: DataTypes.INTEGER,
    pinjaman_pegawai: DataTypes.INTEGER,
    lain_lain: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Potongan',
  });
  return Potongan;
};