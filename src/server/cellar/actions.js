import * as actionTypes from '../../common/constants/ActionTypes';
import {getCellar, addWine} from './services';
import {moveWineToPermanetFolder} from '../pictures/services';

let actions = {};

actions[actionTypes.ADD_WINE] = (action) => {
    return moveWineToPermanetFolder(action.thumbnailFileName, action.pictureFileName)
        .then(fileUploaded => {
            let actionFormated = {...action,
                ...fileUploaded
            };
            return addWine(actionFormated);
        });
};

export default actions;
