const Bull = require('bull');

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
    const tgQueue = new Bull('tgQueue', 'redis://localhost:6379');
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const providerObj of resCheckType) {
      switch (providerObj.connectionType) {
        case 1:
          console.log('case 1');
          result.push(
            await services.sendToTgBot(providerObj, req.params.accountId),
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

          console.log(tgQueue.process(services.sendToTgNumber));

          console.log(
            await tgQueue.add({
              obj: providerObj,
              accountId: req.params.accountId,
            }),
          );
          // await services.sendToTgNumber(providerObj, req.params.accountId),
          break;
        default:
          resFinish(res, httpCodes.badReq, {
            error: 'bad connectionType code',
          });
      }
    }
    // tgQueue.on('completed', (job, resJob) => {
    //   console.log(`Job completed with result ${resJob}`);
    //   result.push(resJob);
    // });
    return resFinish(res, httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return resFinish(res, httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = {
  transfer,
};
