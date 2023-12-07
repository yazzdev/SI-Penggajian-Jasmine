'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RoleAccesses', [
      {
        role_id: 1,
        module_id: 1,
        is_read: true,
        is_write: true,
        is_update: true,
        is_delete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 1,
        module_id: 2,
        is_read: true,
        is_write: true,
        is_update: true,
        is_delete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 2,
        module_id: 1,
        is_read: true,
        is_write: false,
        is_update: true,
        is_delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 2,
        module_id: 2,
        is_read: true,
        is_write: true,
        is_update: true,
        is_delete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 3,
        module_id: 1,
        is_read: false,
        is_write: false,
        is_update: false,
        is_delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 3,
        module_id: 2,
        is_read: true,
        is_write: false,
        is_update: false,
        is_delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RoleAccesses', null, {});
  }
};
