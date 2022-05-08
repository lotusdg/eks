module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('accountProviders', 'counterInstalled', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('providers', 'peerId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('providers', 'accessHash', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('accountProviders', 'counterInstalled');
    await queryInterface.removeColumn('providers', 'peerId');
    await queryInterface.removeColumn('providers', 'accessHash');
  },
};
