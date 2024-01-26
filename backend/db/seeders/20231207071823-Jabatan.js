'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const airportsRaw = require('./data/jabatan.json');
    const tjabatan = airportsRaw.map(airport => {
      return {
        ...airport,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('tjabatan', tjabatan, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tjabatan', null, {});
  }
};
