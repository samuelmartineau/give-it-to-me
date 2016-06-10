import logger from '../utils/logger';
import config from '../../../config';
import * as serverConstants from '../../common/constants/server';
import {addToBasket, removeFromBasket} from './services';

export default router => {
    router.post(serverConstants.ROUTES.BASKET, (req, res) => {
        return addToBasket(req.body.wineId);
    });

    router.delete(serverConstants.ROUTES.BASKET, (req, res) => {
        return removeFromBasket(req.body.basketId);
    });
};
