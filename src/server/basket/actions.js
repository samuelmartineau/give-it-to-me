import * as actionTypes from '../../common/constants/ActionTypes';
import {addToBasket} from './services';
import {moveWineToPermanetFolder} from '../pictures/services';

let actions = {};

actions[actionTypes.ADD_TO_BASKET] = (wineId) => {
    return addToBasket(wineId);
};

export default actions;
