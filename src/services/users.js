const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { createResponse } = require('../utils');
const { httpCodes } = require('../utils');
const { dbWrapper } = require('../server/db');

async function createUser(body) {
  try {
    const timestamp = Date.now();
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(body.password, salt);
    const userBody = {
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email,
      password: hashPassword,
      phone: body.phone,
    };
    const cloneUser = await dbWrapper().dbModels.user.findOne({
      where: {
        email: body.email,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    if (cloneUser !== null) {
      return createResponse(httpCodes.ok, {
        success: false,
        message: 'Email already exists',
      });
    }
    const result = await dbWrapper().dbModels.user.create({
      fullName: userBody.fullName || null,
      email: userBody.email,
      phone: userBody.phone || null,
      password: userBody.password,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
    });
    if (!result) {
      throw new Error('unable to create a user');
    }
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

async function updateUser(body, id) {
  try {
    const timestamp = Date.now();

    // Hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(body.password, salt);

    const userFields = {
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      password: hashPassword,
      updatedAt: timestamp,
    };
    Object.keys(userFields).forEach((key) => {
      if (typeof userFields[key] === 'undefined') {
        delete userFields[key];
      }
    });
    const result = await dbWrapper().dbModels.user.update(userFields, {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      returning: true,
    });
    return createResponse(httpCodes.ok, result[1][0].dataValues);
  } catch (err) {
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

async function getUser(id) {
  try {
    const result = await dbWrapper().dbModels.user.findOne({
      where: { id, deletedAt: null },
      include: [{ all: true }],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    });
    if (result === null) {
      return createResponse(httpCodes.badReq, {
        message: `bad user id: ${id}`,
      });
    }

    return createResponse(httpCodes.ok, result);
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.serverError, { error: err.message || err });
  }
}

async function deleteUser(id) {
  try {
    const timestamp = Date.now();
    await dbWrapper().dbModels.user.update(
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

async function findUsersEmail(userEmail) {
  try {
    if (!userEmail) {
      throw new Error('ERROR: no email id defined');
    }
    const res = await dbWrapper().dbModels.user.findOne({
      where: {
        email: userEmail,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });

    console.log(`INFO: user by id ${JSON.stringify(res)}`);

    return res;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  findUsersEmail,
};
