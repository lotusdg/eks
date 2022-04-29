module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('accountProviders', 'status', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('accountProviders', 'status');
  },
};
