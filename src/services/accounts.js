const { account, address, accountProvider } = require('../server/db/sequelize');
const { createResponse, httpCodes } = require('../utils');

async function createAccount(body, id) {
  try {
    const timestamp = Date.now();

    const resultAddress = await address.create({
      city: body.addresses.city,
      street: body.addresses.street,
      house: body.addresses.house || null,
      flat: body.addresses.flat || null,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
    });

    const resultAccount = await account.create({
      fullName: body.account.fullName,
      phone: body.account.phone,
      addressId: resultAddress.id,
      userId: id,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
    });

    const providers = [];
    body.providers.forEach((element) => {
      if (element.status === true) {
        providers.push({
          number: element.number,
          status: element.status,
          accountId: resultAccount.id,
          providerId: element.id,
          createdAt: timestamp,
          updatedAt: timestamp,
          deletedAt: null,
        });
      }
    });
    await accountProvider.bulkCreate(providers);

    return createResponse(httpCodes.ok, resultAccount);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
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
      fullName: body.account.fullName,
      phone: body.account.phone,
      updatedAt: timestamp,
    };
    Object.keys(accountFields).forEach((key) => {
      if (typeof accountFields[key] === 'undefined') {
        delete accountFields[key];
      }
    });

    const resultAccount = await account.update(accountFields, {
      where: { id },
      returning: true,
    });

    const addressFields = {
      city: body.addresses.city,
      street: body.addresses.street,
      house: body.addresses.house,
      flat: body.addresses.flat,
      updatedAt: timestamp,
    };
    Object.keys(addressFields).forEach((key) => {
      if (typeof addressFields[key] === 'undefined') {
        delete addressFields[key];
      }
    });
    await address.update(addressFields, {
      where: { id: resultAccount[1][0].addressId },
      returning: false,
    });

    const cloneAccountProviders = await accountProvider.findAll({
      where: { accountId: id },
    });

    const providers = [];
    body.providers.forEach((elementBody) => {
      cloneAccountProviders.forEach((elementDb) => {
        if (
          elementDb.accountId === id &&
          elementDb.providerId === elementBody.id
        ) {
          providers.push({
            id: elementDb.id,
            status: elementBody.status,
            number: elementBody.number,
          });
        }
      });
    });
    await accountProvider.bulkCreate(providers, {
      updateOnDuplicate: ['number', 'status'],
      returning: false,
    });

    return createResponse(httpCodes.ok, { success: true });
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

async function deleteAccount(id) {
  try {
    const timestamp = Date.now();
    await account.update(
      {
        deletedAt: timestamp,
      },
      {
        where: { id },
      },
    );
    return createResponse(httpCodes.ok, { success: true });
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

module.exports = {
  createAccount,
  getAccountsByUserId,
  updateAccount,
  deleteAccount,
};
