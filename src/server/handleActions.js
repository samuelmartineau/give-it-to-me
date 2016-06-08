import logger from './utils/logger';
import handleCellarActions from './cellar/actions';
import handleBasketActions from './basket/actions';

const actions = {...handleCellarActions, ...handleBasketActions};

export default (action) => {
    if (typeof actions[action.type] !== 'function') {
        logger.error('action type not found', action.type);
        throw new Error('action type not found', action.type);
    }

    return actions[action.type](action.data);
};
