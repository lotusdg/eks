/* eslint-disable max-len */

// eslint-disable-next-line import/no-extraneous-dependencies
const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable => "tokens", deps: [users]
 *
 */

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'tokens',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
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
        token: { type: Sequelize.STRING, field: 'token', allowNull: false },
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
      'tokens',
      ['userId'],
      { indexName: 'token_userId', name: 'token_userId', transaction },
    ],
  },

  {
    fn: 'removeColumn',
    params: ['users', 'refreshToken', { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['tokens', { transaction }],
  },

  {
    fn: 'addColumn',
    params: [
      'users',
      'refreshToken',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
      { transaction },
    ],
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

  up: async (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),

  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
};
