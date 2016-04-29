import mongoose from 'mongoose';
import config from '../../config';
import logger from './utils/logger';

mongoose.set('debug', config.debug);

mongoose.connection
    .on('error', error => {
        logger.debug('error on mongo connection', error);
    })
    .once('open', () => {
        logger.info('Connected to mongo server.');
    });

mongoose.connect(`mongodb://${config.DB.user}:${config.DB.password}@${config.DB.host}/${config.DB.database}`);
