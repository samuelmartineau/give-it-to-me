import logger from '../utils/logger';
import config from '../../../config';
import * as actionTypes from '../../common/constants/ActionTypes';
import {getCellar, addWine} from './service';

function doAction(action) {
    let actions = {};
    actions[actionTypes.ADD_WINE] = (action) => {
        return addWine(action).then(() => ({
            message: 'Vin ajouté avec succés'
        }));
    }

    if (typeof actions[action.type] !== 'function') {
        logger.error('action type not found', action.type);
        throw new Error('action type not found', action.type);
    }

    return actions[action.type](action.data);
}

const handleAction = (action) => {
    return doAction(action);
}

export default handleAction;
