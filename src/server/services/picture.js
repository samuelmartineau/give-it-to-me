import {subClass} from 'gm';
import uuid from 'node-uuid';
import path from 'path';

import config from '../../../config';
import * as serverConstants from '../../common/constants/server';

const gm = subClass({imageMagick: true});

export function generateThumbnail(sourcePath, extension) {
    return new Promise(
        function(resolve, reject) {
            const filename = [uuid.v1(), extension].join('');
            const tmpFileName = path.join(config.DIST, config.UPLOADS_TMP_DIRECTORY, filename);
            gm(sourcePath)
                .resize(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT, '^')
                .gravity('Center')
                .crop(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT)
                .quality(serverConstants.PICTURE_UPLOAD.THUMBNAIL.QUALITY)
                .write(tmpFileName, (error) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve({
                        name: filename,
                        path: tmpFileName
                    });
                });
        });
}

export function generateBlur(path) {
    return new Promise(
        function(resolve, reject) {
            gm(path)
                .resize(3, 3)
                .toBuffer('GIF', (error, buffer) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(`data:image/gif;base64,${buffer.toString('base64')}`);
                });
        });
}
