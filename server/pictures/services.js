const { subClass } = require('gm');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { promises: fs } = require('fs');

const config = require('../../config');
const logger = require('../utils/logger');

const gm = subClass({ imageMagick: true });

const rootFolder = path.resolve(__dirname, '../..');
const TEMP_DIR = path.join(
  rootFolder,
  config.ASSETS_BASE_URL,
  config.UPLOADS_TMP_DIRECTORY
);
const PERM_DIR = path.join(
  rootFolder,
  config.ASSETS_BASE_URL,
  config.UPLOADS_PERM
);

const generateThumbnail = (sourcePath, extension) => {
  return new Promise((resolve, reject) => {
    const filename = [uuidv4(), extension].join('');
    const tmpFileName = path.join(TEMP_DIR, filename);
    gm(sourcePath)
      .resize(
        config.PICTURE_UPLOAD.THUMBNAIL.WIDTH,
        config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT,
        '^'
      )
      .gravity('Center')
      .crop(
        config.PICTURE_UPLOAD.THUMBNAIL.WIDTH,
        config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT
      )
      .autoOrient()
      .quality(config.PICTURE_UPLOAD.THUMBNAIL.QUALITY)
      .on('error', (error) => {
        logger.error(error);
        return reject('Erreur de paramètre avec l’image uploadée');
      })
      .write(tmpFileName, (error) => {
        if (error) {
          logger.error(error);
          return reject({
            message: 'Erreur lors de la génération de la miniature',
          });
        }
        return resolve({ name: filename, path: tmpFileName });
      });
  });
};
const generateBlur = (path) => {
  return new Promise((resolve, reject) => {
    gm(path)
      .resize(3, 3)
      .toBuffer('GIF', (error, buffer) => {
        if (error) {
          logger.error(error);
          return reject({ message: 'Erreur lors de la génération du flou' });
        }

        return resolve(`data:image/gif;base64,${buffer.toString('base64')}`);
      })
      .on('error', function (error) {
        logger.error(error);
        return reject('Erreur de paramètre avec le flou');
      });
  });
};

const moveWineToPermanentFolder = (thumbnailFilePath, pictureFilePath) => {
  const thumbnailFileName = path.basename(thumbnailFilePath);
  const pictureFileName = path.basename(pictureFilePath);
  const tempThumbnailFileNamePath = path.join(TEMP_DIR, thumbnailFileName);
  const permThumbnailFileNamePath = path.join(PERM_DIR, thumbnailFileName);
  const tempPictureFileNamePath = path.join(TEMP_DIR, pictureFileName);

  const fileExtension = path.extname(pictureFileName);
  const newFileName = [uuidv4(), fileExtension].join('');
  const permPictureFileNamePath = path.resolve(PERM_DIR, newFileName);
  let promises = [
    fs.rename(tempThumbnailFileNamePath, permThumbnailFileNamePath),
    fs.rename(tempPictureFileNamePath, permPictureFileNamePath),
  ];

  return Promise.all(promises).then(() => {
    return { thumbnailFileName, pictureFileName: newFileName };
  });
};

module.exports = {
  generateThumbnail,
  generateBlur,
  moveWineToPermanentFolder,
};
