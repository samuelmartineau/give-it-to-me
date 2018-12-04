const winston = require('winston');
const config = require('../../config');

let logger = winston.createLogger([
  {
    level: 'error',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({
        filename: config.LOGGER_INFO_FILE_PATH,
        maxsize: 5242880
      }),
      new winston.transports.Console()
    ]
  },
  {
    level: 'info',
    format: winston.format.combine(winston.format.json()),
    transports: [
      new winston.transports.File({
        filename: config.LOGGER_INFO_FILE_PATH,
        maxsize: 5242880
      }),
      new winston.transports.Console()
    ]
  }
]);

module.exports = logger;
module.exports.stream = {
  write: message => {
    logger.info(message);
  }
};
