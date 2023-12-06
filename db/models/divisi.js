'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Divisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Divisi.init({
    nama_divisi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Divisi',
    tableName: 'tdivisi',
  });
  return Divisi;
};