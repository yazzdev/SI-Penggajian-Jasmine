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
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      zakat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      absensi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      transport: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      pinjaman_pegawai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      lain_lain: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      nip_pegawai: {
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