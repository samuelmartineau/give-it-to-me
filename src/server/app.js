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
import compression from 'compression';
import deviceInfos from 'device-infos';
import {createStore} from 'redux';

import config from '../../config';
import * as serverConstants from '../common/constants/server';
import reducers from '../common/reducers';
import logger from './utils/logger';
import {renderFullPage, fakeWindow, skip} from './utils';
import routes from '../common/routes';
import pictureRoutes from './pictures/routes';
import {getCellar, onCellarChange} from './cellar/service';
import handleAction from './cellar/handleAction';
import './utils/db';

global.navigator = { navigator: 'all' };

// API REST
// =============================================================================
const app = express();
app.use(compression())
app.use(skip(serverConstants.API_BASE_URL, cookieParser()));
app.use(skip(serverConstants.API_BASE_URL, bodyParser.urlencoded({extended: true})));
app.use(skip(serverConstants.API_BASE_URL, deviceInfos({timeout: 1000})));
app.use(skip(serverConstants.API_BASE_URL, fakeWindow()));
app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
const serverHttp = Server(app);
serverHttp.listen(config.PORT, () => logger.info(`Server started on port ${config.PORT}`));

const pictureRouter = express.Router(() => {    });
pictureRoutes(pictureRouter);
app.use(serverConstants.API_BASE_URL, pictureRouter);

app.get('/*', (req, res) => {
    match({ routes, location: req.url}, (err, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (err) {
            res.status(500).send(err.message);
        } else if (renderProps == null) {
            res.status(404).send('Not found');
        } else {

            getCellar().then(cellar => {
                const store = createStore(reducers, {cellar});
                const InitialView = (
                    < Provider className = "root" store={store} >
                        < div >
                            < RouterContext {...renderProps} />
                        </div>
                    </Provider>
                );

                const finalState = {cellar};
                const html = renderToString(InitialView);
                res.status(200).end(renderFullPage(html, finalState, config.BUNDLE_FILENAME));
            });
        }
    });
});
// =============================================================================

// SOCKET
// =============================================================================
const io = new SocketIo(serverHttp);

onCellarChange(cellar => {
    io.emit('state', {cellar});
});

io.on('connection', (socket) => {
    socket.on('action', (action, acknowledgements) => {
        handleAction(action)
            .then((message) => {
                acknowledgements({
                    type: action.type,
                    success: true,
                    ...message
                });
            })
            .catch(error => {
                acknowledgements({
                    type: action.type,
                    success: false,
                    error: error
                });
            });
    });
});
// =============================================================================
