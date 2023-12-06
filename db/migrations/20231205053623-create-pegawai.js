'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tpegawai', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nip: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nama_pegawai: {
        type: Sequelize.STRING
      },
      user_type: {
        type: Sequelize.STRING
      },
      tgl_masuk: {
        type: Sequelize.DATE
      },
      gaji_pokok: {
        type: Sequelize.INTEGER
      },
      bank: {
        type: Sequelize.STRING
      },
      no_rekening: {
        type: Sequelize.STRING
      },
      isActivated: {
        type: Sequelize.BOOLEAN
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      id_jabatan: {
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
    await queryInterface.dropTable('tpegawai');
  }
};