import gmPkg from 'gm';
const { subClass } = gmPkg;
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises as fs } from 'fs';

import config from '../../config/index.js';
import logger from '../utils/logger.js';

const gm = subClass({ imageMagick: true });

const generateThumbnail = (context) => (sourcePath, extension) => {
  return new Promise((resolve, reject) => {
    const filename = [uuidv4(), extension].join('');
    const tmpFileName = path.join(context.TEMP_DIR, filename);
    gm(sourcePath)
      .resize(
        config.PICTURE_UPLOAD.THUMBNAIL.WIDTH,
        config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT,
        '^',
      )
      .gravity('Center')
      .crop(
        config.PICTURE_UPLOAD.THUMBNAIL.WIDTH,
        config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT,
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
      .on('error', (error) => {
        logger.error(error);
        return reject('Erreur de paramètre avec le flou');
      });
  });
};

const moveWineToPermanentFolder =
  (context) => (thumbnailFilePath, pictureFilePath) => {
    const thumbnailFileName = path.basename(thumbnailFilePath);
    const pictureFileName = path.basename(pictureFilePath);
    const tempThumbnailFileNamePath = path.join(
      context.TEMP_DIR,
      thumbnailFileName,
    );
    const permThumbnailFileNamePath = path.join(
      context.PERM_DIR,
      thumbnailFileName,
    );
    const tempPictureFileNamePath = path.join(
      context.TEMP_DIR,
      pictureFileName,
    );

    const fileExtension = path.extname(pictureFileName);
    const newFileName = [uuidv4(), fileExtension].join('');
    const permPictureFileNamePath = path.resolve(context.PERM_DIR, newFileName);

    const promises = [
      fs.rename(tempThumbnailFileNamePath, permThumbnailFileNamePath),
      fs.rename(tempPictureFileNamePath, permPictureFileNamePath),
    ];

    return Promise.all(promises)
      .then(() => {
        return { thumbnailFileName, pictureFileName: newFileName };
      })
      .catch((error) => {
        logger.error(error);
        throw new Error('Error on moving file to permanent folder');
      });
  };

export const picturesServices = (SERVER_VARIABLES) => {
  const TEMP_DIR = path.join(
    SERVER_VARIABLES.FILE_DIRECTORY,
    config.UPLOADS_TMP_FOLDER,
  );
  const PERM_DIR = path.join(
    SERVER_VARIABLES.FILE_DIRECTORY,
    config.UPLOADS_PERM_FOLDER,
  );

  const context = {
    TEMP_DIR,
    PERM_DIR,
  };

  return {
    generateThumbnail: generateThumbnail(context),
    moveWineToPermanentFolder: moveWineToPermanentFolder(context),
    generateBlur,
  };
};
