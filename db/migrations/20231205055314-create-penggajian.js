'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penggajians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      total_gaji: {
        type: Sequelize.INTEGER
      },
      id_tunjangan: {
        type: Sequelize.STRING
      },
      id_jabatan: {
        type: Sequelize.STRING
      },
      id_potongan: {
        type: Sequelize.STRING
      },
      nip_pegawai: {
        type: Sequelize.STRING
      },
      take_home_pay: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Penggajians');
  }
};