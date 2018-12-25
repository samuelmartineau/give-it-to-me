const { subClass } = require('gm');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
const bluebird = require('bluebird');

const config = require('../../config');
const logger = require('../utils/logger');

bluebird.promisifyAll(fs);

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
      .on('error', error => {
        logger.error(error);
        return reject('Erreur de paramètre avec l’image uploadée');
      })
      .write(tmpFileName, error => {
        if (error) {
          logger.error(error);
          return reject({
            message: 'Erreur lors de la génération de la miniature'
          });
        }
        return resolve({ name: filename, path: tmpFileName });
      });
  });
};
const generateBlur = path => {
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
      .on('error', function(error) {
        logger.error(error);
        return reject('Erreur de paramètre avec le flou');
      });
  });
};

const moveWineToPermanetFolder = (thumbnailFileName, pictureFileName) => {
  const tempThumbnailFileNamePath = path.join(TEMP_DIR, thumbnailFileName);
  const permThumbnailFileNamePath = path.join(PERM_DIR, thumbnailFileName);
  const tempPictureFileNamePath = path.join(TEMP_DIR, pictureFileName);

  const fileExtension = path.extname(pictureFileName);
  const newFileName = [uuidv4(), fileExtension].join('');
  const permPictureFileNamePath = path.resolve(PERM_DIR, newFileName);
  let promises = [];
  promises.push(
    fs.renameAsync(tempThumbnailFileNamePath, permThumbnailFileNamePath)
  );
  promises.push(
    fs.renameAsync(tempPictureFileNamePath, permPictureFileNamePath)
  );
  return Promise.all(promises)
    .then(() => {
      return { thumbnailFileName, pictureFileName: newFileName };
    })
    .catch(error => {
      logger.error(error);
      return Promise.reject({
        message: 'Erreur lors du déplacement des images temporaires'
      });
    });
};

module.exports = {
  generateThumbnail,
  generateBlur,
  moveWineToPermanetFolder
};
