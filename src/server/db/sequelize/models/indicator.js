module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'indicator',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'indicators',
    },
  );

  Model.associate = (models) => {
    Model.belongsTo(models.provider);
  };

  return Model;
};
