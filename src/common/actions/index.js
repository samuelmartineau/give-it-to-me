import fetch from 'isomorphic-fetch';

import config from '../../../config';
import routes from '../../server/routes';

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

function uploadPicture() {
    return {
        type: types.UPLOAD_PICTURE
    };
}

export function uploadWinePicture(picture) {
    return dispatch => {
        const data = new FormData();
        data.append(config.UPLOADS.FILE_NAME, picture);
        dispatch(uploadPicture());
        return fetch(config.API_BASE_URL + routes.PICTURE, {
            method: 'post',
            body: data
        })
            .catch(error => {
                debugger
                throw error;
            });
    };
}
