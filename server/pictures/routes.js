const multer = require('multer');
const path = require('path');
const express = require('express');

const logger = require('../utils/logger');
const config = require('../../config');
const { generateThumbnail, generateBlur } = require('./services');

const pathToTmpAssets = path.join(
  config.FILE_DIRECTORY,
  config.UPLOADS_TMP_FOLDER
);

const storage = multer.diskStorage({
  destination: pathToTmpAssets,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router
  .route(config.ROUTES.PICTURE)
  .post(upload.single(config.PICTURE_UPLOAD.FILE_NAME), async (req, res) => {
    try {
      let thumbnailFile;
      const fileExtension = path.extname(req.file.originalname);
      const thumbnail = await generateThumbnail(req.file.path, fileExtension);
      thumbnailFile = thumbnail.name;
      const blur = await generateBlur(thumbnail.path);

      res.json({
        thumbnailFileName: path.join(
          config.FILE_URL_PATH,
          config.UPLOADS_TMP_FOLDER,
          thumbnailFile
        ),
        pictureFileName: path.join(
          config.FILE_URL_PATH,
          config.UPLOADS_TMP_FOLDER,
          req.file.originalname
        ),
        blur: blur,
      });
    } catch (error) {
      logger.error('error during picture processing', error);
      res.status(500).json({ error: error });
    }
  });

module.exports = router;
