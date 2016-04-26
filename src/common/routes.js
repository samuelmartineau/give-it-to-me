import { IndexRoute, Route } from 'react-router';
import React from 'react';

import AppContainer from './containers/App';
import WelcomeContainer from './containers/Welcome';

const routes = (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={WelcomeContainer} />
      <Route path="welcome" component={WelcomeContainer} />
    </Route>
);

export default routes;
