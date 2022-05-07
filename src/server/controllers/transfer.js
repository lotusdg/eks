const { resFinish, httpCodes } = require('../../utils');

const services = require('../../services');

async function transfer(req, res) {
  const { err, resCheckType } = await services.checkType(req.body);
  if (err) {
    return resFinish(res, err.code || httpCodes.serverError, {
      error: err.message || err,
    });
  }
  let result;
  // eslint-disable-next-line no-restricted-syntax
  for await (const iterator of resCheckType) {
    switch (iterator.connectionType) {
      case 1:
        console.log('case 1');
        break;
      case 2:
        console.log('case 2');
        break;
      case 3:
        console.log('case 3');
        result = await services.sendToTgNumber(iterator, req.params.accountId);
        break;
      default:
        resFinish(res, httpCodes.badReq, { error: 'bad connectionType code' });
    }
  }

  const { code, message } = result;

  return resFinish(res, code, message);
}

module.exports = {
  transfer,
};
