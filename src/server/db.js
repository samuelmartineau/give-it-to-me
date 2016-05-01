import mongooseCore from 'mongoose';
import Promise from 'bluebird';

import config from '../../config';
import logger from './utils/logger';

const mongoose = Promise.promisifyAll(mongooseCore);

mongoose.set('debug', config.debug);

mongoose.connection
    .on('error', error => {
        logger.debug('error on mongo connection', error);
    })
    .once('open', () => {
        logger.info('Connected to mongo server.');
    });

if (config.IS_HEROKU) {
    require('mockgoose')(mongoose).then(function() {
    	mongoose.connect('mongodb://example.com/TestingDB');
    });
} else {
    mongoose.connect(`mongodb://${config.DB.user}:${config.DB.password}@${config.DB.host}/${config.DB.database}`);
}
