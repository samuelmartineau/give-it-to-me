import { IndexRoute, Route } from 'react-router';
import React from 'react';

import AppContainer from './containers/App';
import WelcomeContainer from './containers/Welcome';
import AddContainer from './containers/Add';

const routes = (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={WelcomeContainer} />
      <Route path="welcome" component={WelcomeContainer} />
      <Route path="add" component={AddContainer} />
    </Route>
);

export default routes;
