module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'provider',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      code: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
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
  };

  return Model;
};
