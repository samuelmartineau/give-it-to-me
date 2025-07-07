import bunyan from 'bunyan';
import config from '../../../config/index.js';

const logger = bunyan.createLogger({
  name: 'give-it-to-me',
  streams: [
    {
      level: 'info',
      stream: process.stdout, // log INFO and above to stdout
    },
    {
      level: 'error',
      path: config.LOGGER_ERROR_FILE_PATH,
    },
  ],
});

export default logger;
