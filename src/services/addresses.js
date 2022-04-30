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

async function updateAddress(body, id) {
  try {
    const timestamp = Date.now();
    const addressFields = {
      city: body.city,
      street: body.street,
      house: body.house,
      flat: body.flat,
      updatedAt: timestamp,
    };
    Object.keys(addressFields).forEach((key) => {
      if (typeof addressFields[key] === 'undefined') {
        delete addressFields[key];
      }
    });
    const resultAddress = await address.update(addressFields, {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      returning: true,
    });
    return { resultAddress };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { createAddress, updateAddress };
