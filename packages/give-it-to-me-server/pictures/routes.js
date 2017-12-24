const multer = require('multer');
const path = require('path');
const express = require('express');

const logger = require('../utils/logger');
const config = require('give-it-to-me-config');
const { generateThumbnail, generateBlur } = require('./services');

const storage = multer.diskStorage({
  destination: path.join(config.UPLOADS_TMP_DIRECTORY),
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router
  .route(config.ROUTES.PICTURE)
  .post(upload.single(config.PICTURE_UPLOAD.FILE_NAME), (req, res) => {
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
        res.status(500).json({ error: error });
      });
  });

module.exports = router;
