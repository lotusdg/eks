require('dotenv').config();
const api = require('./api');
const phone = process.env.PHONE;
const code = process.env.CODE;

async function authorization() {
  const user = await api.getUser();
  // console.log("User 1st try: ", user);

  if (!user) {
    const { phone_code_hash } = await api.sendCode(phone);

    try {
      const signInResult = await api.signIn({
        code,
        phone,
        phone_code_hash,
      });
      // console.log(signInResult);

      if (signInResult._ === 'auth.authorizationSignUpRequired') {
        const singUpResult = await api.signUp({
          phone,
          phone_code_hash,
        });
        // console.log(singUpResult);
      }

      const newUser = await api.getUser();
      console.log('User 2nd try: ', newUser);
    } catch (error) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        console.log(`error:`, error);

        return;
      }

      // 2FA

      const password = 'USER_PASSWORD';

      const { srp_id, current_algo, srp_B } = await getPassword();
      const { g, p, salt1, salt2 } = current_algo;

      const { A, M1 } = await api.mtproto.crypto.getSRPParams({
        g,
        p,
        salt1,
        salt2,
        gB: srp_B,
        password,
      });

      const checkPasswordResult = await checkPassword({ srp_id, A, M1 });
    }
  }

  const result = await api.call('help.getNearestDc');
  console.log(result);
  // return process.exit(0);
}

module.exports = authorization;
