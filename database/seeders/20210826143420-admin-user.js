'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        email: 'admin@example.org',
        password: 'password',
        id: '7bcb21b0-ee07-4d22-b1a0-82db470f20da',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
