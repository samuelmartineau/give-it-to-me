import multer from 'multer';
import path from 'path';

import logger from '../utils/logger';
import config from '../../../config';
import * as serverConstants from '../../common/constants/server';
import {generateThumbnail, generateBlur} from '../services/picture';

const upload = multer({ dest: config.UPLOADS_TMP_DIRECTORY });

module.exports = function(router) {

    router.post(serverConstants.ROUTES.PICTURE, upload.single(serverConstants.PICTURE_UPLOAD.FILE_NAME), (req, res) => {
        let thumbnailPath;
        generateThumbnail(req.file.path, path.extname(req.file.originalname))
            .then(tempFilePath => {
                thumbnailPath = tempFilePath;
                return generateBlur(tempFilePath);
            })
            .then(blur => {
                setTimeout((() => {
                    res.json({
                        tempFilePath: thumbnailPath,
                        blur: blur
                    });
                }), 5000);
            })
            .catch(error => {
                logger.error('error during picture processing', error);
                res.status(500).json({error: error});
            });
    });
};