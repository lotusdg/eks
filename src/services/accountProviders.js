const { dbWrapper } = require('../server/db');
const { createResponse, httpCodes } = require('../utils');

async function getAccountProvidersByAccountId(accountId) {
  try {
    const result = await dbWrapper().dbModels.accountProvider.findAll({
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
          model: dbWrapper().dbModels.provider,
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
  getAccountProvidersByAccountId,
};
