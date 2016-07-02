import React from 'react'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {browserHistory} from 'react-router'
import {AppContainer} from 'react-hot-loader'

import configureStore from '../common/store/configureStore'
import Root from '../common/containers/Root'
import {setState} from '../common/actions'

const initialState = window.__INITIAL_STATE__
const rootElement = document.getElementById('react')

const store = configureStore(initialState)

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const source = new window.EventSource('/sse')

source.addEventListener('message', function (dataString) {
  const data = JSON.parse(dataString.data)
  store.dispatch(setState(data.action, data.state))
}, false)

render(
  <AppContainer><Root store={store} history={browserHistory} /></AppContainer>, rootElement
)

if (module.hot) {
  module.hot.accept('../common/containers/Root', () => {
    const Root2 = require('../common/containers/Root').default
    render(<AppContainer><Root2 store={store} history={browserHistory} /></AppContainer>, rootElement)
  })
}
