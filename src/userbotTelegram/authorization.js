/* eslint-disable camelcase */
require('dotenv').config();
const api = require('./api');

const phone = process.env.PHONE;
const code = process.env.CODE;

async function authorization() {
  const user = await api.getUser();

  if (!user) {
    const { phone_code_hash } = await api.sendCode(phone);

    try {
      const signInResult = await api.signIn({
        code,
        phone,
        phone_code_hash,
      });

      if (signInResult._ === 'auth.authorizationSignUpRequired') {
        await api.signUp({
          phone,
          phone_code_hash,
        });
      }

      const newUser = await api.getUser();
      console.log('User 2nd try: ', newUser);
    } catch (error) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        console.log('error:', error);
        return;
      }
    }
  }

  const result = await api.call('help.getNearestDc');
  console.log(result);
}

module.exports = authorization;
