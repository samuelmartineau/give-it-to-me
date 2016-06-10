import {subClass} from 'gm';
import uuid from 'node-uuid';
import path from 'path';
import fs from 'fs';
import bluebird from 'bluebird';

import config from '../../../config';
import logger from '../utils/logger';
import * as serverConstants from '../../common/constants/server';

bluebird.promisifyAll(fs);

const gm = subClass({imageMagick: true});

export const generateThumbnail = (sourcePath, extension) => {
    return new Promise(
        (resolve, reject) => {
            const filename = [uuid.v1(), extension].join('');
            const tmpFileName = path.join(config.UPLOADS_TMP_DIRECTORY, filename);
            gm(sourcePath)
                .resize(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT, '^')
                .gravity('Center')
                .crop(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT)
                .quality(serverConstants.PICTURE_UPLOAD.THUMBNAIL.QUALITY)
                .on('error', function(error) {
                    logger.error(error);
                    return reject('Erreur de paramètre avec l’image uploadée');
                })
                .write(tmpFileName, error => {
                    if (error) {
                        logger.error(error);
                        return reject({message: 'Erreur lors de la génération de la miniature'});
                    }

                    return resolve({
                        name: filename,
                        path: tmpFileName
                    });
                })
        });
}
export const generateBlur = path => {
    return new Promise(
        (resolve, reject) => {
            gm(path)
                .resize(3, 3)
                .toBuffer('GIF', (error, buffer) => {
                    if (error) {
                        logger.error(error);
                        return reject({message: 'Erreur lors de la génération du flou'});
                    }

                    return resolve(`data:image/gif;base64,${buffer.toString('base64')}`);
                })
                .on('error', function(error) {
                    logger.error(error);
                    return reject('Erreur de paramètre avec le flou');
                });
        });
}

export const moveWineToPermanetFolder = (thumbnailFileName, pictureFileName) => {
    const tempThumbnailFileNamePath = path.join(config.UPLOADS_TMP_DIRECTORY, thumbnailFileName);
    const permThumbnailFileNamePath = path.join(config.UPLOADS_PERM, thumbnailFileName);
    const tempPictureFileNamePath = path.join(config.UPLOADS_TMP_DIRECTORY, pictureFileName);
    const fileExtension = path.extname(pictureFileName);
    const newFileName = [uuid.v1(), fileExtension].join('');
    const permPictureFileNamePath = path.join(config.UPLOADS_PERM, newFileName);
    let promises = [];
    promises.push(fs.renameAsync(tempThumbnailFileNamePath, permThumbnailFileNamePath))
    promises.push(fs.renameAsync(tempPictureFileNamePath, permPictureFileNamePath))
    return Promise.all(promises)
        .then(() => {
            return {
                thumbnailFileName,
                pictureFileName: newFileName
            }
        }).catch(error => {
            logger.error(error);
            return Promise.reject({message: 'Erreur lors du déplacement des images temporaires'});
        })
}
