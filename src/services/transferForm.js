const axios = require('axios');
const Sequelize = require('sequelize');
const { dbWrapper } = require('../server/db');
const { createTransferResponse } = require('../utils');

const url =
  // eslint-disable-next-line max-len
  'http://www.chergas.ck.ua/spozhivacham/pp/77-prijom-pokaznikiv?chronoform=Pokaz&event=submit';

// eslint-disable-next-line no-unused-vars
async function sendRequest(currReq, currUrl = url) {
  const resStatus = await axios
    .post(currUrl, {
      todo: currReq,
    })
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      return res.status;
    })
    .catch((error) => {
      throw error;
    });

  return resStatus;
}

async function submitFormRequest(obj, accountId) {
  try {
    const { accountProvider, account, address } = await dbWrapper().dbModels;

    const cloneProvider = await accountProvider.findOne({
      where: {
        accountId,
        providerId: obj.provider,
        status: true,
        deletedAt: { [Sequelize.Op.is]: null },
      },
      include: [
        {
          model: account,
          where: { deletedAt: { [Sequelize.Op.is]: null } },
          include: [{ model: address }],
        },
      ],
    });

    if (!cloneProvider) {
      return createTransferResponse(obj.provider, false, {
        error: 'Account not found with assigned id',
      });
    }

    const objAddress = cloneProvider.dataValues.account.address;
    const flat = !objAddress.flat ? '' : objAddress.flat;

    const strReq =
      `input_number=${cloneProvider.dataValues.number}&` +
      `input_pokaz=${obj.value}&` +
      `misac=${new Date().getMonth() + 1}&` +
      `nas_pynkt=${objAddress.city}&` +
      `street=${objAddress.street}&` +
      `house=${objAddress.house}&` +
      `flat=${flat}&` +
      `input_phone=${cloneProvider.dataValues.account.phone}&` +
      'input_agree=&' +
      `input_agree=${1}&` +
      'input_submit=Відправити+дані&' +
      '28dba1fcf910d4f3ea7fc24bd0956b13=1';
    console.log(strReq);

    const encodedReq = encodeURI(strReq);
    console.log(encodedReq);

    const resStatus = true; // await sendRequest(encodedReq);

    return createTransferResponse(
      obj.provider,
      true,
      `${strReq} (status: ${resStatus})`,
    );
  } catch (err) {
    console.error(err.message || err);
    return createTransferResponse(obj.provider, false, {
      error: err.message || err,
    });
  }
}

module.exports = { submitFormRequest };
