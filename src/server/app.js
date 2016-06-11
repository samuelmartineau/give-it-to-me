import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import SSE from 'sse';
import fs from 'fs';
import {Server} from 'http';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { RouterContext, match } from 'react-router';
import compression from 'compression';
import deviceInfos from 'device-infos';
import {createStore} from 'redux';

import config from '../../config';
import * as serverConstants from '../common/constants/server';
import * as ActionTypes from '../common/constants/ActionTypes';
import reducers from '../common/reducers';
import logger from './utils/logger';
import {renderFullPage, fakeWindow, skip} from './utils';
import routes from '../common/routes';
import {getCellar, onCellarChange, computeCellar} from './wine/services';
import {getBasket, onBasketChange} from './basket/services';
import handleRoutes from './handleRoutes';
import './utils/db';

if (!fs.existsSync(config.UPLOADS_PERM)){
    fs.mkdirSync(config.UPLOADS_PERM);
}

if (typeof navigator === 'undefined') {
    global.navigator = {
        userAgent: 'all'
    };
}

// API REST
// =============================================================================
const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(skip(serverConstants.API_BASE_URL, cookieParser()));
app.use(skip(serverConstants.API_BASE_URL, deviceInfos({timeout: 1000})));
app.use(skip(serverConstants.API_BASE_URL, fakeWindow()));
app.use('/', express.static(path.join(__dirname, '..', '..', config.DIST)));
app.use('/', express.static(path.join(__dirname, '..', '..', config.UPLOADS_PERM)));
app.use('/', express.static(path.join(__dirname, '..', '..', config.UPLOADS_TMP_DIRECTORY)));
const serverHttp = Server(app);
const clients = [];
serverHttp.listen(config.PORT, () => logger.info(`Server started on port ${config.PORT}`), () => {
  const sse = new SSE(serverHttp);

  sse.on('connection', stream => {
    logger.info('Opened connection 🎉');
    clients.push(stream);

    stream.on('close', () => {
      clients.splice(clients.indexOf(stream), 1);
      logger.info('Closed connection 😱');
    });
  });
});

handleRoutes(app);

function sendResult(finalState, reducers, renderProps, res) {
    const store = createStore(reducers, finalState);
    const InitialView = (
        < Provider className = "root" store={store} >
            < div >
                < RouterContext {...renderProps} />
            </div>
        </Provider>
    );

    const html = renderToString(InitialView);
    res.status(200).end(renderFullPage(html, finalState, config.BUNDLE_FILENAME));
}

app.get('/*', (req, res) => {
    match({ routes, location: req.url}, (err, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (err) {
            res.status(500).send(err.message);
        } else if (renderProps == null) {
            res.status(404).send('Not found');
        } else {
            let finalState;
            Promise.all([getCellar(), getBasket()])
                .then(result => {
                    finalState = {
                        cellar: result[0],
                        basket: result[1],
                    };
                    sendResult(finalState, reducers, renderProps, res);
            }).catch(error => {
                logger.error(error);
                finalState = {
                    cellar: computeCellar([]),
                    basket: [],
                    notification: {
                        success: false,
                        message: 'Erreur de connection avec la base de données',
                        open: true
                    }
                };
                sendResult(finalState, reducers, renderProps, res);
            });
        }
    });
});
// =============================================================================

// Server-Sent Events
// =============================================================================
onCellarChange(cellar => {
    clients.forEach(stream => {
        stream.send(JSON.stringify({action: ActionTypes.SET_CELLAR, state: cellar}));
    });
});
onBasketChange(basket => {
    clients.forEach(stream => {
        stream.send(JSON.stringify({action: ActionTypes.SET_BASKET, state: basket}));
    });
});
// =============================================================================

process.on('unhandledRejection', function(reason, p){
    logger.error(`Possibly Unhandled Rejection at: Promise ${p} reason: ${reason}`);
});
