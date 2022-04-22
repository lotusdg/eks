require('dotenv').config();
const { fatal } = require('../utils');

const config = {
  portEnv: process.env.PORT || 3000,
  port: process.env.PORT || 3000,
  db: {
    defaultType: process.env.DB_WRAPPER_TYPE  || 'sequelize',
    config: {
      sequelize: {
        dialect: 'postgres',
        username: process.env.DB_USER ||
          fatal('DB_USER is not defined'),
        host: process.env.DB_HOST || fatal('DB_HOST is not defined'),
        port: process.env.DB_PORT || fatal('DB_PORT is not defined'),
        database: process.env.DB_NAME ||
          fatal('DB_NAME is not defined'),
        password: process.env.DB_PASS ||
          fatal('DB_PASS is not defined'),
        // logging: true,
        logging: console.log,
        pool: {
          min: 0,
          max: 10,
          idle: 5000,
          acquire: 5000,
          evict: 5000,
        }
      }
    }
  }
};

module.exports = config;
