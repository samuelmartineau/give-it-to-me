/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

let AppWrapper = props => props.children;

function withRoot(BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }

      return {};
    }

    render() {
      return (
        <AppWrapper>
          <BaseComponent {...this.props} />
        </AppWrapper>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;
