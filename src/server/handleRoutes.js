import express from 'express';

import pictureRoutes from './pictures/routes';
import basketRoutes from './basket/routes';
import wineRoutes from './wine/routes';
import * as serverConstants from '../common/constants/server';

export default (app) => {
    const router = express.Router(() => {});
    pictureRoutes(router);
    basketRoutes(router);
    wineRoutes(router);
    app.use(serverConstants.API_BASE_URL, router);
};
