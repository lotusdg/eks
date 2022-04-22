/* eslint-disable max-len */
/* eslint-disable import/no-dynamic-require */
const { readdirSync } = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const modelsDir = path.join(__dirname, './models');

const name = 'sequelize';

module.exports = (config) => {
  const sequelize = new Sequelize(config);
  const db = {};

  readdirSync(modelsDir)
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach(file => {
    // eslint-disable-next-line global-require,
    const model = require(path.join(modelsDir, file))
      (sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return {
    testConnection: async () => {
      try{
        console.log(`hello from ${name} testConnection`);
        await sequelize.authenticate();
      } catch (err) {console.error(err.message || err);
        throw err;
      };
    },

    close: async () => {
      console.log(`INFO: Closing ${name} DB wrapper`);
      sequelize.close();
    },

    // findUsersEmail: async (userEmail) => {
    //   try{
    //     if (!userEmail){ throw new Error('ERROR: no email id defined' ); };

    //     const res = await db.user.findOne({
    //       where: {
    //         email: userEmail,
    //         deletedAt: { [Sequelize.Op.is]: null }
    //       }
    //     });

    //     console.log(
    //       `INFO: product by id ${JSON.stringify(res)}`
    //     );

    //     return res;

    //   } catch (err){
    //     console.error(err.message || err);
    //     throw err;
    //   };
    // },

    // createUser: async (user) => {

    //   const timeStamp = Date.now();

    //   const cloneUser = JSON.parse(JSON.stringify(user));
    //   cloneUser.lastLoginDt = timeStamp;
    //   cloneUser.nickname = cloneUser.email;

    //   const res = await db.user.create(cloneUser);
    //   return res;
    // },

    // createRefreshToken: async (userIdParam, tokenParam) => {
    //   const timeStamp = Date.now();

    //   try{
    //     const [tokenItem, created] = await db.token.findOrCreate({
    //       where: { userId: userIdParam,
    //         deletedAt: { [Sequelize.Op.is]: null  },
    //       },
    //       defaults: {
    //         createdAt: timeStamp,
    //         updatedAt: timeStamp,
    //         deletedAt: null,
    //         token: tokenParam,
    //         userId: userIdParam
    //       },
    //     });
    //     if (created){
    //       console.log(`INFO: entity token with id ${tokenItem.id} was created`);
    //       return tokenItem;
    //     };

    //     tokenItem.set('token', tokenParam);
    //     await tokenItem.save();
    //     return tokenItem;

    //   } catch (err){
    //     console.error(err.message || err);
    //     throw err;
    //   };

    // },


  };
};
