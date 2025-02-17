'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull:true
      },
      description: {
        type: Sequelize.STRING,
        allowNull:true
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:true
      }, 
       hostId: {
        type: Sequelize.UUID,
        allowNull:true,
        
        references: {
          model: "users",
          key: "id",
        },
      },
      province: {
        type: Sequelize.STRING,
        allowNull:true
      }, 
      district: {
        type: Sequelize.STRING,
        allowNull:true
      },
      sector:{
           type: Sequelize.STRING,
          allowNull:true
      },
      isAvailable: {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('properties');
  }
};