const multer = require('multer');
const path = require('path');
const express = require('express');
const asyncHandler = require('express-async-handler');

const logger = require('../utils/logger');
const config = require('../../config');
const { picturesServices } = require('./services');

const router = express.Router();

function picturesRoutes(SERVER_VARIABLES) {
  const pathToTmpAssets = path.join(
    SERVER_VARIABLES.FILE_DIRECTORY,
    config.UPLOADS_TMP_FOLDER
  );

  const storage = multer.diskStorage({
    destination: pathToTmpAssets,
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  const { generateThumbnail, generateBlur } = picturesServices(
    SERVER_VARIABLES
  );

  router.route(config.ROUTES.PICTURE).post(
    upload.single(config.PICTURE_UPLOAD.FILE_NAME),
    asyncHandler(async (req, res) => {
      try {
        let thumbnailFile;
        const fileExtension = path.extname(req.file.originalname);
        const thumbnail = await generateThumbnail(req.file.path, fileExtension);
        thumbnailFile = thumbnail.name;
        const blur = await generateBlur(thumbnail.path);
        const temporyFolder = path.join(
          config.FILE_URL_PATH,
          config.UPLOADS_TMP_FOLDER
        );
        res.json({
          thumbnailFileName: path.join(temporyFolder, thumbnailFile),
          pictureFileName: path.join(temporyFolder, req.file.originalname),
          blur,
        });
      } catch (error) {
        logger.error('error during picture processing', error);
        res.status(500).json({ error: error });
      }
    })
  );

  return router;
}

module.exports = picturesRoutes;
