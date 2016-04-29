import {subClass} from 'gm';
import uuid from 'node-uuid';
import path from 'path';

import config from '../../../config';
import * as serverConstants from '../../common/constants/server';

const gm = subClass({imageMagick: true});

export function generateThumbnail(sourcePath, extension) {
    return new Promise(
        function(resolve, reject) {
            var tmpFileName = path.join(config.UPLOADS_TMP_DIRECTORY, [uuid.v1(), extension].join(''));
            gm(sourcePath)
                .resize(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT, '^')
                .noProfile()
                .gravity('Center')
                .crop(serverConstants.PICTURE_UPLOAD.THUMBNAIL.WIDTH, serverConstants.PICTURE_UPLOAD.THUMBNAIL.HEIGHT)
                .quality(serverConstants.PICTURE_UPLOAD.THUMBNAIL.QUALITY)
                .write(tmpFileName, (error) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(tmpFileName);
                });
        });
}

export function generateBlur(path) {
    return new Promise(
        function(resolve, reject) {
            gm(path)
                .resize(2, 3)
                .toBuffer('GIF', (error, buffer) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(`data:image/gif;base64,${buffer.toString('base64')}`);
                });
        });
}
