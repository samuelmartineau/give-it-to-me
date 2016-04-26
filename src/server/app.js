import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import SocketIo from 'socket.io';
import {Server} from 'http';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { RouterContext, match } from 'react-router';

import config from '../../config';
import createServerStore from './store';
import logger from './utils/logger';
import {renderFullPage, fakeWindow, skip} from './utils';
import DevTools from '../common/containers/DevTools';
import routes from '../common/routes';
import deviceInfos from '../../device-infos';

const store = createServerStore();

global.navigator = { navigator: 'all' };

store.dispatch({type: 'ADD_WINE', wine: {name: 'Château Franc Mayne'}});

// API REST
// =============================================================================
const app = express();
app.use(skip(config.API_BASE_URL, cookieParser()));
app.use(skip(config.API_BASE_URL, bodyParser.urlencoded({extended: true})));
app.use(skip(config.API_BASE_URL, deviceInfos({timeout: 2000})));
app.use(skip(config.API_BASE_URL, fakeWindow()));
app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
const serverHttp = Server(app);
serverHttp.listen(config.PORT, () => logger.info(`Server started on port ${config.PORT}`));

app.get('/*', (req, res) => {
    match({ routes, location: req.url}, (err, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (err) {
            res.status(500).send(err.message);
        } else if (renderProps == null) {
            res.status(404).send('Not found');
        } else {

            const InitialView = (
                < Provider className = "root" store={store} >
                    < div >
                        < RouterContext {...renderProps} />
                    </div>
                </Provider>
            );

            const finalState = store.getState();
            const html = renderToString(InitialView);
            res.status(200).end(renderFullPage(html, finalState));
    }
    });
});
// =============================================================================

// SOCKET
// =============================================================================
const io = new SocketIo(serverHttp);

store.subscribe(
    () => io.emit('state', store.getState())
);

io.on('connection', (socket) => {
    logger.info('Socket Connection');
    socket.on('action', store.dispatch.bind(store));
});
// =============================================================================

process.on('uncaughtException', err => {
    logger.error('uncaughtException', err);
});
