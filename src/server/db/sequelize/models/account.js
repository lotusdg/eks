module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'account',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'abc',
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: 'accounts',
    },
  );

  Model.associate = (models) => {
    Model.hasMany(models.accountProvider);
  };

  return Model;
};
