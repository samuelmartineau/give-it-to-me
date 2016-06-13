import { IndexRoute, Route } from 'react-router';
import React from 'react';

import AppContainer from './containers/App';
import WelcomeContainer from './containers/Welcome';
import AddContainer from './containers/Add';
import SearchContainer from './containers/Search';
import BasketContainer from './containers/Basket';

const routes = (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={WelcomeContainer} />
      <Route path="welcome" component={WelcomeContainer} />
      <Route path="add" component={AddContainer} />
      <Route path="search" component={SearchContainer} />
      <Route path="basket" component={BasketContainer} />
    </Route>
);

export default routes;
