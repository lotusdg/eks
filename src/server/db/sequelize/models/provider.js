module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'provider',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      code: { type: DataTypes.STRING, allowNull: false, defaultValue: 0 },
      shortName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'abc',
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'abc',
      },
      peerId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'abc',
      },
      accessHash: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'abc',
      },
      deletedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
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
    },
    {
      timestamps: false,
      underscored: false,
      tableName: 'providers',
      indexes: [{ fields: ['code'] }],
    },
  );

  Model.associate = (models) => {
    Model.hasMany(models.accountProvider);
    Model.belongsTo(models.connectionType);
  };

  return Model;
};
