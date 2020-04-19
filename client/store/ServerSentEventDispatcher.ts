import React from 'react';
import { connect } from 'react-redux';

import { setCellar } from './';

type Props = {
  onEvent: Function;
};

class ServerSentEventDispatcher extends React.Component<Props> {
  componentDidMount() {
    const { onEvent } = this.props;
    const source = new window.EventSource(`${window.location.origin}/sse`, {
      withCredentials: true,
    });

    source.addEventListener(
      'message',
      function (evt) {
        const { cellar } = JSON.parse(evt.data);
        onEvent(cellar);
      },
      false
    );

    source.addEventListener(
      'error',
      function () {
        if (this.readyState == EventSource.CLOSED) {
          // Connection was closed.
          console.log('Connection was closed');
        }
      },
      false
    );
  }
  render() {
    return null;
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    onEvent(cellar) {
      dispatch(setCellar(cellar));
    },
  })
)(ServerSentEventDispatcher);
