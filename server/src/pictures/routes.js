import multer from 'multer';
import path from 'path';
import express from 'express';

import logger from '../utils/logger.js';
import config from '../../../config/index.js';
import { picturesServices } from './services.js';

const router = express.Router();

function picturesRoutes(SERVER_VARIABLES) {
  const pathToTmpAssets = path.join(
    SERVER_VARIABLES.FILE_DIRECTORY,
    config.UPLOADS_TMP_FOLDER,
  );

  const storage = multer.diskStorage({
    destination: pathToTmpAssets,
    filename: function filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  const { generateThumbnail, generateBlur } =
    picturesServices(SERVER_VARIABLES);

  router
    .route(config.ROUTES.PICTURE)
    .post(upload.single(config.PICTURE_UPLOAD.FILE_NAME), async (req, res) => {
      try {
        const fileExtension = path.extname(req.file.originalname);
        const thumbnail = await generateThumbnail(req.file.path, fileExtension);
        const thumbnailFile = thumbnail.name;
        const blur = await generateBlur(thumbnail.path);
        const temporyFolder = path.join(
          config.FILE_URL_PATH,
          config.UPLOADS_TMP_FOLDER,
        );
        res.json({
          thumbnailFileName: path.join(temporyFolder, thumbnailFile),
          pictureFileName: path.join(temporyFolder, req.file.originalname),
          blur,
        });
      } catch (error) {
        logger.error('error during picture processing', error);
        res.status(500).json({ error });
      }
    });

  return router;
}

export default picturesRoutes;
