'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('properties', 'price', {
      type: Sequelize.BIGINT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('properties', 'price', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};