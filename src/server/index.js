const { portEnv } = require('../config');
const server = require('./routes');

let listener;

function start() {
  try {
    listener = server.listen(portEnv, () => {
      console.log(`Server successfully started on port ${portEnv}`);
    });
  } catch (e) {
    console.log(e);
  }
}

function stop(callback) {
  if (!server) {
    callback();
    return;
  }
  listener.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback();
      return;
    }
    console.log('Server has been stopped.');
    callback();
  });
}

module.exports = {
  start,
  stop,
};
