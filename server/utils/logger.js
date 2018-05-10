const winston = require('winston');
const config = require('../../config');
winston.emitErrs = true;

let logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-to-file',
      level: 'info',
      prettyPrint: true,
      filename: config.LOGGER_INFO_FILE_PATH,
      maxsize: 5242880
    }),
    new winston.transports.Console({
      name: 'info-to-terminal',
      level: 'info',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: false
    }),
    new winston.transports.Console({
      name: 'error-to-terminal',
      level: 'error',
      handleExceptions: true,
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: false
    }),
    new winston.transports.File({
      name: 'error-to-file',
      level: 'error',
      filename: config.LOGGER_ERROR_FILE_PATH,
      handleExceptions: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};
