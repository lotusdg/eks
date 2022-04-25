require('dotenv').config();
const { fatal } = require('../utils');

const config = {
  portEnv: process.env.PORT || 3000,
  port: process.env.PORT || 3000,
  db: {
    defaultType:
      process.env.DB_WRAPPER_TYPE ||
      fatal('FATAL: DB_WRAPPER_TYPE is not defined'),
    config: {
      sequelize: {
        dialect:
          process.env.DB_DIALECT || fatal('FATAL: DB_DIALECT is not defined'),
        username: process.env.DB_USER || fatal('FATAL: DB_USER is not defined'),
        host: process.env.DB_HOST || fatal('FATAL: DB_HOST is not defined'),
        port: process.env.DB_PORT || fatal('FATAL: DB_PORT is not defined'),
        database: process.env.DB_NAME || fatal('FATAL: DB_NAME is not defined'),
        password: process.env.DB_PASS || fatal('FATAL: DB_PASS is not defined'),
        logging: console.log,
        pool: {
          min: 0,
          max: 10,
          idle: 5000,
          acquire: 5000,
          evict: 5000,
        },
      },
    },
  },
};

module.exports = config;
