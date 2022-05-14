const { resFinish, httpCodes } = require('../../utils');

const services = require('../../services');

async function transfer(req, res) {
  try {
    const { validationError, resCheckType } =
      await services.validationAndCheckType(req.body);
    if (validationError) {
      return resFinish(res, httpCodes.badReq, {
        error: validationError.message || validationError,
      });
    }
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const iterator of resCheckType) {
      switch (iterator.connectionType) {
        case 1:
          console.log('case 1');
          result.push(
            await services.sendToTgBot(iterator, req.params.accountId),
          );
          break;
        case 2:
          console.log('chergas');
          result.push(
            await services.submitFormRequest(iterator, req.params.accountId),
          );
          break;
        case 3:
          console.log('case 3');
          result.push(
            await services.sendToTgNumber(iterator, req.params.accountId),
          );
          break;
        default:
          resFinish(res, httpCodes.badReq, {
            error: 'bad connectionType code',
          });
      }
    }
    return resFinish(res, httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return resFinish(res, httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = {
  transfer,
};
