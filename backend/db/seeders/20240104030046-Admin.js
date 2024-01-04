'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const admin = await bcrypt.hashSync('admin', saltRounds);

    await queryInterface.bulkInsert('tadmin', [
      {
        username: 'admin',
        password: admin,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tadmin', null, {});
  }
};
