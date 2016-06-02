import r from 'rethinkdb';

import config from '../../../config';
import logger from './logger';

export const getConnection = r.connect({db: config.DB.database, host: config.DB.host}).then((conn) => {
    logger.info(`Connected to rethinkdb on ${conn.host}:${conn.port} to ${conn.db}`);
    return conn;
}).catch(error => {
    logger.error('error from rethinkdb', error);
});
