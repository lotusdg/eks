module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'user',
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
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
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

  Model.associate = (models) => {
    Model.hasMany(models.account);
  };

  return Model;
};
