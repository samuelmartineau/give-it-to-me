import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises as fs } from 'fs';

import config from '../../../config/index.js';
import logger from '../utils/logger.js';

const OUTPUT_FORMAT_ALIASES = { jpg: 'jpeg', jpe: 'jpeg', tif: 'tiff' };

const outputFormatFromExtension = (extension) => {
  const name = extension.replace(/^\./, '').toLowerCase();
  const format = OUTPUT_FORMAT_ALIASES[name] || name;
  return sharp.format[format]?.output.file ? format : null;
};

const generateThumbnail = (context) => async (sourcePath, extension) => {
  const filename = [uuidv4(), extension].join('');
  const tmpFileName = path.join(context.TEMP_DIR, filename);
  const { WIDTH, HEIGHT, QUALITY } = config.PICTURE_UPLOAD.THUMBNAIL;
  const format = outputFormatFromExtension(extension);

  if (!format) {
    logger.error(`Unsupported thumbnail extension: ${extension}`);
    throw { message: 'Erreur de paramètre avec l’image uploadée' };
  }

  try {
    await sharp(sourcePath)
      .autoOrient()
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
      .toFormat(format, { quality: QUALITY })
      .toFile(tmpFileName);
  } catch (error) {
    logger.error(error);
    throw { message: 'Erreur lors de la génération de la miniature' };
  }

  return { name: filename, path: tmpFileName };
};

const generateBlur = async (path) => {
  try {
    const buffer = await sharp(path)
      .resize(3, 3, { fit: 'inside' })
      .gif()
      .toBuffer();
    return `data:image/gif;base64,${buffer.toString('base64')}`;
  } catch (error) {
    logger.error(error);
    throw { message: 'Erreur lors de la génération du flou' };
  }
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
