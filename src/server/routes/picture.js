import multer from 'multer';
import {subClass} from 'gm';

import logger from '../utils/logger';
import config from '../../../config';
import * as serverConstants from '../../common/constants/server';

const gm = subClass({imageMagick: true});
const upload = multer({ dest: config.UPLOADS_TMP_DIRECTORY });

module.exports = function(router) {

    router.post(serverConstants.ROUTES.PICTURE, upload.single(serverConstants.PICTURE_UPLOAD.FILE_NAME), (req, res) => {

        gm(req.file.path)
            .resize(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT, '^')
            .noProfile()
            .gravity('Center')
            .crop(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT)
            .quality(serverConstants.PICTURE_UPLOAD.THUMBNAIL.QUALITY)
            .write(config.UPLOADS_TMP_DIRECTORY + 'test.png', (err) => {
                if (err) {
                    logger.debug('gm service error, gm resize', err);
                }

                gm(config.UPLOADS_TMP_DIRECTORY + 'test.png')
                    .resize(2, 3)
                    .toBuffer('GIF', function (error, buffer) {
                        logger.info('data:image/gif;base64,' + buffer.toString('base64'));
                    });
            });

        res.json('good');
    });
};
