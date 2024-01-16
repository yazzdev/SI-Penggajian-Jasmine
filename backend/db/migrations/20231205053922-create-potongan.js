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
        type: Sequelize.BIGINT
      },
      zakat: {
        type: Sequelize.BIGINT
      },
      absensi: {
        type: Sequelize.BIGINT
      },
      transport: {
        type: Sequelize.BIGINT
      },
      pinjaman_pegawai: {
        type: Sequelize.BIGINT
      },
      lain_lain: {
        type: Sequelize.BIGINT
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