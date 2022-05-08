const { dbWrapper } = require('../server/db');
const { validation } = require('./helpers/validatorForBodyTransfer');

async function validationAndCheckType(body) {
  try {
    const { validationError, validBody } = await validation(body);
    if (validationError) {
      return { validationError };
    }
    const { connectionType, provider } = await dbWrapper().dbModels;
    // eslint-disable-next-line no-restricted-syntax
    for await (const iterator of validBody) {
      const cloneProvider = await provider.findOne({
        where: {
          id: iterator.provider,
        },
        include: [{ model: connectionType }],
      });
      iterator.connectionType = cloneProvider.connectionType.code;
    }
    return { resCheckType: validBody };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  validationAndCheckType,
};
