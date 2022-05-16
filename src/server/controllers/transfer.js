const { resFinish, httpCodes, createTransferResponse } = require('../../utils');

const services = require('../../services');

global.botConversationInProgress = false;

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
    for await (const providerObj of resCheckType) {
      switch (providerObj.connectionType) {
        case 1:
          console.log('case 1');
          if (!global.botConversationInProgress) {
            global.botConversationInProgress = true;
            result.push(
              await services.sendToTgBot(providerObj, req.params.accountId),
            );
            global.botConversationInProgress = false;
            // eslint-disable-next-line no-else-return
          } else {
            result.push(
              createTransferResponse(providerObj.provider, false, {
                error: 'Service is busy. Please try later.',
              }),
            );
          }
          break;
        case 2:
          console.log('case 2');
          result.push(
            await services.submitFormRequest(providerObj, req.params.accountId),
          );
          break;
        case 3:
          console.log('case 3');
          await services.sendToTgNumber(providerObj, req.params.accountId);
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
