const bunyan = require('bunyan');
const config = require('../../config');

const logger = bunyan.createLogger({
  name: 'give-it-to-me',
  streams: [
    {
      level: 'info',
      stream: process.stdout // log INFO and above to stdout
    },
    {
      level: 'error',
      path: config.LOGGER_ERROR_FILE_PATH
    }
  ]
});

module.exports = logger;
