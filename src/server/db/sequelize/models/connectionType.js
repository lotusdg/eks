/* eslint-disable max-len */
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'connectionType',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      code: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
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
      tableName: 'connectionTypes',
      indexes: [{ fields: ['code'] }],
    },
  );

  Model.associate = (models) => {
    Model.belongsTo(models.provider);
    // Model.hasMany(models.team, { foreignKey: { allowNull: false } })
    // Model.hasMany(models.order, { foreignKey: { allowNull: false } });
    // Model.belongsToMany(models.product, { through: models.order });
  };

  return Model;
};
