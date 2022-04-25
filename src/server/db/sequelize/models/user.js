/* eslint-disable max-len */
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'abc',
      },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      refreshToken: { type: DataTypes.STRING, allowNull: true },
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
      tableName: 'users',
      indexes: [{ fields: ['email'] }],
    },
  );

  return Model;
};
