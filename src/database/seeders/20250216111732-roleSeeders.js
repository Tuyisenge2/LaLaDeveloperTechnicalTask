'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up (queryInterface, Sequelize) {  
      await queryInterface.bulkInsert('roles', [
        {
          id: "11afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
        roleName: 'Hosts',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ,    {
        id: "12afd4f1-0bed-4a3b-8ad5-0978dabf8fcd",
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
