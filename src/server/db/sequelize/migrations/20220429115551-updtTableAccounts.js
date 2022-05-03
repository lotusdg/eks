module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('accounts', 'fullName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('accounts', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn('accounts', 'number');
    await queryInterface.removeColumn('accounts', 'providerId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('accounts', 'fullName');
    await queryInterface.removeColumn('accounts', 'phone');
    await queryInterface.addColumn('accounts', 'number', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('accounts', 'providerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
