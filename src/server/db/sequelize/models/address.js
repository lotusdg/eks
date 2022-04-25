/* eslint-disable max-len */
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'address',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      city: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
      street: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
      house: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
      flat: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
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
      tableName: 'addresses',
      indexes: [{ fields: ['id'] }],
    },
  );

  Model.associate = (models) => {
    Model.belongsTo(models.account);
  };

  return Model;
};
