'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tunjangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tunjangan.init({
    transport: DataTypes.INTEGER,
    makan: DataTypes.INTEGER,
    komunikasi: DataTypes.INTEGER,
    keahlian: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tunjangan',
    tableName: 'ttunjangan',
  });
  return Tunjangan;
};