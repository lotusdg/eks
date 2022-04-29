const { address } = require('../server/db/sequelize');

async function createAddress(body) {
  try {
    const timestamp = Date.now();
    const resultAddress = await address.create({
      city: body.city,
      street: body.street,
      house: body.house || null,
      flat: body.flat || null,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null,
    });
    return { resultAddress };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { createAddress };
