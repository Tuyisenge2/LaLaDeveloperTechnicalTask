'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
   
  
    const password = await bcrypt.hash('Password123', 10);
    const createdAt = new Date();
    
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: password,
        confirmPassword: password,
        role: "11afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
        createdAt,
        updatedAt: createdAt
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};