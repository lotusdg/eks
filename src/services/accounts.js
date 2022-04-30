const { account, address } = require('../server/db/sequelize');
const { createResponse, httpCodes } = require('../utils');
const { createAddress, updateAddress } = require('./addresses');

async function createAccount(body, id) {
  try {
    const timestamp = Date.now();
    const { resultAddress } = await createAddress(body.addresses);
    const resultAccount = await account.create({
      fullName: body.account.fullName,
      phone: body.account.phone,
      addressId: resultAddress.id,
      userId: id,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null,
    });
    return { resultAccount };
  } catch (err) {
    throw new Error(err);
  }
}

async function getAccountsByUserId(userId) {
  try {
    const result = await account.findAll({
      where: {
        userId,
        deletedAt: null,
      },
      attributes: {
        exclude: ['userId', 'addressId', 'createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: address,
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
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

async function updateAccount(body, id) {
  try {
    const timestamp = Date.now();
    const accountFields = {
      fullName: body.fullName,
      phone: body.phone,
      updatedAt: timestamp,
    };
    Object.keys(accountFields).forEach((key) => {
      if (typeof accountFields[key] === 'undefined') {
        delete accountFields[key];
      }
    });
    const accountClone = await account.findOne({
      where: {
        id,
      },
    });
    await updateAddress(body.address, accountClone.addressId);
    await account.update(accountFields, {
      where: { id },
    });
    return createResponse(httpCodes.ok, { success: true });
  } catch (err) {
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = {
  createAccount,
  getAccountsByUserId,
  updateAccount,
};
