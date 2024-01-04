'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tdivisi', [
      {
        nama_divisi: 'Keuangan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nama_divisi: 'Kesehatan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tdivisi', null, {});
  }
};
