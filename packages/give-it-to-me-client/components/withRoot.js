/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import teal from 'material-ui/colors/teal';

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default
    }
  }
});

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const theme = createMuiTheme({
  palette: {
    primary: teal
  }
});

function withRoot(BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }

      return {};
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <MuiThemeProvider theme={theme}>
          <AppWrapper>
            <BaseComponent {...this.props} />
          </AppWrapper>
        </MuiThemeProvider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
