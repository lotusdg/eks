const { dbWrapper } = require('../server/db');
// const { createResponse, httpCodes } = require('../utils');

async function checkType(body) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for await (const iterator of body) {
      const cloneProvider = await dbWrapper().dbModels.provider.findOne({
        where: {
          id: iterator.provider,
        },
        include: [{ model: dbWrapper().dbModels.connectionType }],
      });
      iterator.connectionType = cloneProvider.connectionType.code;
    }
    return { resCheckType: body };
  } catch (err) {
    return { err };
  }
}

module.exports = {
  checkType,
};
