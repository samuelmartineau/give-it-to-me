import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'

import DevTools from './DevTools'
import routes from '../routes'

const Root = ({store, history}) => (
  <Provider store={store}>
    <div>
      <Router history={history}>
        {routes}
      </Router>
      {process.env.NODE_ENV === 'production' || <DevTools/>}
    </div>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
export default Root
