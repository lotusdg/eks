module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'accountProvider',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Date.now(),
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: Date.now(),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
      deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    },
    {
      timestamps: false,
      underscored: false,
      tableName: 'accountProviders',
    },
  );

  Model.associate = (models) => {
    Model.belongsTo(models.account);
    Model.belongsTo(models.provider);
  };

  return Model;
};
