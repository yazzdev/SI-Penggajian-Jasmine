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
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      makan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      komunikasi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      keahlian: {
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
    await queryInterface.dropTable('ttunjangan');
  }
};