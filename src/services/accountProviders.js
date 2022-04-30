const { accountProvider, provider } = require('../server/db/sequelize');
const { createResponse, httpCodes } = require('../utils');
const { createAccount } = require('./accounts');

async function createAccountProvider(body, id) {
  try {
    const timestamp = Date.now();
    const { resultAccount } = await createAccount(body, id);
    const accounts = [];
    body.providers.forEach((element) => {
      if (element.status === true) {
        accounts.push({
          number: element.number,
          status: element.status,
          accountId: resultAccount.id,
          providerId: element.id,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }
    });
    const result = await accountProvider.bulkCreate(accounts);
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, err.message || err);
  }
}

async function getAccountProvidersByAccountId(accountId) {
  try {
    const result = await accountProvider.findAll({
      where: { accountId, deletedAt: null, status: true },
      attributes: {
        exclude: [
          'accountId',
          'providerId',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
      },
      include: [
        {
          model: provider,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      ],
    });
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = {
  createAccountProvider,
  getAccountProvidersByAccountId,
};
