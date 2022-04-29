const { account } = require('../server/db/sequelize');
const { createAddress } = require('./addresses');

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

module.exports = { createAccount };
