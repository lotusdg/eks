/* eslint-disable max-len */
/* eslint-disable import/no-dynamic-require */
const { readdirSync } = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const services = require('../../../services');

const modelsDir = path.join(__dirname, './models');
const name = 'sequelize';

module.exports = (config) => {
  const sequelize = new Sequelize(config);
  const db = {};

  readdirSync(modelsDir)
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach((file) => {
      // eslint-disable-next-line global-require,
      const model = require(path.join(modelsDir, file))(
        sequelize,
        Sequelize.DataTypes,
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return {
    testConnection: async () => {
      try {
        console.log(`hello from ${name} testConnection`);
        await sequelize.authenticate();
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log(`INFO: Closing ${name} DB wrapper`);
      sequelize.close();
    },

    createUser: async (body) => {
      const { code, message } = await services.createUser(body, db.user);
      return { code, message };
    },

    updateUser: async (body, id) => {
      const { code, message } = await services.updateUser(body, id, db.user);
      return { code, message };
    },

    getUser: async (id) => {
      const { code, message } = await services.getUser(id, db.user);
      return { code, message };
    },

    deleteUser: async (id) => {
      const { code, message } = await services.deleteUser(id, db.user);
      return { code, message };
    },
  };
};
