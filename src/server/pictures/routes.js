import multer from 'multer';
import path from 'path';

import logger from '../utils/logger';
import config from '../../../config';
import * as serverConstants from '../../common/constants/server';
import {generateThumbnail, generateBlur} from './services';

const storage = multer.diskStorage({
    destination: path.join(config.UPLOADS_TMP_DIRECTORY),
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export default router => {
    router.post(serverConstants.ROUTES.PICTURE, upload.single(serverConstants.PICTURE_UPLOAD.FILE_NAME), (req, res) => {
        let thumbnailFile;
        const fileExtension = path.extname(req.file.originalname);
        generateThumbnail(req.file.path, fileExtension)
            .then(thumbnail => {
                thumbnailFile = thumbnail.name;
                return generateBlur(thumbnail.path);
            })
            .then(blur => {
                res.json({
                    thumbnailFileName: thumbnailFile,
                    pictureFileName: req.file.originalname,
                    blur: blur
                });
            })
            .catch(error => {
                logger.error('error during picture processing', error);
                res.status(500).json({error: error});
            });
    });
};
