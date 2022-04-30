module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'address',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      city: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
      street: { type: DataTypes.STRING, allowNull: false, defaultValue: 'abc' },
      house: { type: DataTypes.STRING, allowNull: true, defaultValue: 'abc' },
      flat: { type: DataTypes.STRING, allowNull: true, defaultValue: 'abc' },
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
    Model.hasOne(models.account);
  };

  return Model;
};
