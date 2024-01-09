'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tpotongan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      makan: {
        type: Sequelize.INTEGER
      },
      zakat: {
        type: Sequelize.INTEGER
      },
      absensi: {
        type: Sequelize.INTEGER
      },
      transport: {
        type: Sequelize.INTEGER
      },
      pinjaman_pegawai: {
        type: Sequelize.INTEGER
      },
      lain_lain: {
        type: Sequelize.INTEGER
      },
      nip_pegawai:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tpotongan');
  }
};