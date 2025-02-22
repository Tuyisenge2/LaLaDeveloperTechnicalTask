module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('properties', 'hostId', {
      type: Sequelize.UUID,
      allowNull: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('properties', 'hostId', {
      type: Sequelize.STRING, 
      allowNull: true
    });
  }
};