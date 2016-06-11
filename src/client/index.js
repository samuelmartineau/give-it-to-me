import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from '../common/store/configureStore';
import {setState} from '../common/actions';
import DevTools from '../common/containers/DevTools';
import routes from '../common/routes';
import config from '../../config';

const initialState = window.__INITIAL_STATE__;
const rootElement = document.getElementById('react');

const store = configureStore(initialState);

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const source = new EventSource('/sse');

source.addEventListener('message', function(dataString) {
    const data = JSON.parse(dataString.data);
    store.dispatch(setState(data.action, data.state));
}, false)

ReactDOM.render(
  <Provider store={store}>
    <div>
        <Router
            children={routes}
            history={browserHistory}
            onUpdate={() => window.scrollTo(0, 0)}
        />
        {process.env.NODE_ENV !== 'production' && <DevTools />}
    </div>
  </Provider>,
  rootElement
);
