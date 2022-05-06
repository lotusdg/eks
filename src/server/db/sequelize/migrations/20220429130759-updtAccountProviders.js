module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('accountProviders', 'fullName');
    await queryInterface.removeColumn('accountProviders', 'phone');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('accountProviders', 'fullName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('accountProviders', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
