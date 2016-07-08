import App from './containers/App'
import Welcome from './containers/Welcome'
import Add from './containers/Add'
import Search from './containers/Search'
import Basket from './containers/Basket'

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Welcome
  },
  childRoutes: [
    {
      path: 'welcome',
      component: Welcome
    }, {
      path: 'add',
      component: Add
    }, {
      path: 'search',
      component: Search
    }, {
      path: 'favorite',
      component: Basket
    }
  ]
}
