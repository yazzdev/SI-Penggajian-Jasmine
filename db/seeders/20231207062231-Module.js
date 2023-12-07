'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Modules', [
      {
        name: 'Authorization',
        description: 'All about Authorization',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Penggajian',
        description: 'All about Penggajian',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
