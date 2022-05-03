module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accountProviders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountId: {
        type: Sequelize.UUID,
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      providerId: {
        type: Sequelize.UUID,
        references: {
          model: 'providers',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accountProviders');
  },
};
