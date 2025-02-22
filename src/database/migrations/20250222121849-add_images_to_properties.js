module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("properties", "images", {
      type: Sequelize.ARRAY(Sequelize.STRING), // Stores multiple image paths
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("properties", "images");
  },
};
