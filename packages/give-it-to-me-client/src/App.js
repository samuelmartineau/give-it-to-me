import React from "react";
import withWidth from "material-ui/utils/withWidth";
import { compose } from "recompose";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LayoutHoc } from "Layout/Layout";
import Home from "Home/Home";

const enhanceLayout = compose(withWidth(), LayoutHoc);

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;
