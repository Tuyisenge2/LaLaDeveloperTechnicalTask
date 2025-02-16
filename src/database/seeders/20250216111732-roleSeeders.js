'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up (queryInterface, Sequelize) {  
      await queryInterface.bulkInsert('roles', [
        {
        id: uuidv4(),
        roleName: 'Hosts',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ,    {
        id: uuidv4(),
        roleName: 'Renters',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    
    ], {});
    
  },
  async down (queryInterface, Sequelize) {
       await queryInterface.bulkDelete('roles', null, {});   
  }
};
