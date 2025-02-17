'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add unique constraint to 'rolename' column
    await queryInterface.addConstraint('roles', {
      fields: ['roleName'],
      type: 'unique',
      name: 'roles_rolename_unique' 
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the unique constraint
    await queryInterface.removeConstraint('roles', 'roles_rolename_unique');
  }
};