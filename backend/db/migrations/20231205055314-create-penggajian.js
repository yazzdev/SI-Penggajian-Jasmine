'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tpenggajian', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_gaji: {
        type: Sequelize.BIGINT
      },
      total_potongan: {
        type: Sequelize.BIGINT
      },
      nip_pegawai: {
        type: Sequelize.STRING
      },
      take_home_pay: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('tpenggajian');
  }
};