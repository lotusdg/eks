/* eslint-disable max-len */

// eslint-disable-next-line import/no-extraneous-dependencies
const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable => "users", deps: []
 * createTable => "addresses", deps: []
 * createTable => "connectionTypes", deps: []
 * createTable => "providers", deps: [connectionTypes]
 * createTable => "accounts", deps: [users, addresses, providers]
 * addIndex(email) => "users"
 * addIndex(id) => "addresses"
 * addIndex(code) => "connectionTypes"
 * addIndex(code) => "providers"
 * addIndex(number) => "accounts"
 *
 */

const info = {
  revision: 1,
  name: 'Try',
  created: '2022-04-25T13:30:00.117Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'users',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        fullName: {
          type: Sequelize.STRING,
          field: 'fullName',
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          field: 'email',
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: 'password',
          allowNull: false,
        },
        refreshToken: {
          type: Sequelize.STRING,
          field: 'refreshToken',
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deletedAt',
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'addresses',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        city: { type: Sequelize.STRING, field: 'city', allowNull: false },
        street: { type: Sequelize.STRING, field: 'street', allowNull: false },
        house: { type: Sequelize.STRING, field: 'house', allowNull: true },
        flat: { type: Sequelize.STRING, field: 'flat', allowNull: true },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deletedAt',
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'connectionTypes',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        code: {
          type: Sequelize.INTEGER,
          field: 'code',
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: 'name', allowNull: false },
        status: { type: Sequelize.STRING, field: 'status', allowNull: false },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deletedAt',
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'providers',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        code: {
          type: Sequelize.STRING,
          field: 'code',
          allowNull: false,
        },
        shortName: {
          type: Sequelize.STRING,
          field: 'shortName',
          defaultValue: 'abc',
          allowNull: true,
        },
        fullName: {
          type: Sequelize.STRING,
          field: 'fullName',
          defaultValue: '',
          allowNull: false,
        },
        connectionTypeId: {
          type: Sequelize.UUID,
          field: 'connectionTypeId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'connectionTypes', key: 'id' },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deletedAt',
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'accounts',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        number: {
          type: Sequelize.INTEGER,
          field: 'number',
          allowNull: false,
        },
        userId: {
          type: Sequelize.UUID,
          field: 'userId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'users', key: 'id' },
          allowNull: true,
        },
        providerId: {
          type: Sequelize.UUID,
          field: 'providerId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'providers', key: 'id' },
          allowNull: true,
        },
        addressId: {
          type: Sequelize.UUID,
          field: 'addressId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'addresses', key: 'id' },
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deletedAt',
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'addIndex',
    params: [
      'users',
      ['email'],
      { indexName: 'users_email', name: 'users_email', transaction },
    ],
  },
  {
    fn: 'addIndex',
    params: [
      'addresses',
      ['id'],
      { indexName: 'address_id', name: 'address_id', transaction },
    ],
  },
  {
    fn: 'addIndex',
    params: [
      'connectionTypes',
      ['code'],
      {
        indexName: 'connectionType_code',
        name: 'connectionType_code',
        transaction,
      },
    ],
  },
  {
    fn: 'addIndex',
    params: [
      'providers',
      ['code'],
      {
        indexName: 'provider_code',
        name: 'provider_code',
        transaction,
      },
    ],
  },
  {
    fn: 'addIndex',
    params: [
      'accounts',
      ['number'],
      {
        indexName: 'account_number',
        name: 'account_number',
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['accounts', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['providers', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['connectionTypes', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['addresses', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['users', { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          // eslint-disable-next-line no-plusplus
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (this.useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,

  up: async (
    queryInterface,
    sequelize, // {
  ) =>
    // eslint-disable-next-line max-len
    execute(queryInterface, sequelize, migrationCommands),

  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
