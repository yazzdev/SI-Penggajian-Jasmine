'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ttunjangan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transport: {
        type: Sequelize.BIGINT
      },
      makan: {
        type: Sequelize.BIGINT
      },
      komunikasi: {
        type: Sequelize.BIGINT
      },
      keahlian: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('ttunjangan');
  }
};