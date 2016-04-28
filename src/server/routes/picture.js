import multer from 'multer';

import logger from '../utils/logger';
import config from '../../../config';
import * as serverConstants from '../../common/constants/server';
import {generateThumbnail, generateBlur} from '../services/picture';

const upload = multer({ dest: config.UPLOADS_TMP_DIRECTORY });

module.exports = function(router) {

    router.post(serverConstants.ROUTES.PICTURE, upload.single(serverConstants.PICTURE_UPLOAD.FILE_NAME), (req, res) => {
        let thumbnailPath;
        generateThumbnail(req.file.path)
            .then(tempFilePath => {
                thumbnailPath = tempFilePath;
                return generateBlur(tempFilePath);
            })
            .then(blur => {
                res.json({
                    tempFilePath: thumbnailPath,
                    blur: blur
                });
            })
            .catch(error => {
                logger.error('error during picture processing', error);
                res.status(500).json({error: error});
            });
    });
};
