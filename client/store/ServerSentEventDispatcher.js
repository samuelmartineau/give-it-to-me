// @flow
import React from 'react';
import { connect } from 'react-redux';

import { setCellar } from './';

type Props = {
  children: React.Node,
  onEvent: Function
};

class ServerSentEventDispatcher extends React.Component<Props> {
  componentDidMount() {
    const { onEvent } = this.props;
    const source = new window.EventSource(`${window.location.origin}/sse`, {
      withCredentials: true
    });

    source.addEventListener(
      'message',
      function(evt) {
        const { cellar } = JSON.parse(evt.data);
        onEvent(cellar);
      },
      false
    );

    source.addEventListener(
      'error',
      function(e) {
        if (e.readyState == EventSource.CLOSED) {
          // Connection was closed.
          console.log('Connection was closed');
        }
      },
      false
    );
  }

  render() {
    return this.props.children;
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    onEvent(cellar) {
      dispatch(setCellar(cellar));
    }
  })
)(ServerSentEventDispatcher);
