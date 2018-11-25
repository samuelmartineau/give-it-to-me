import React from 'react';
import { connect } from 'react-redux';
import config from '~/config';

import { setCellar } from './';

class ServerSentEventDispatcher extends React.Component {
  componentDidMount() {
    const { onEvent } = this.props;
    const source = new window.EventSource(`${config.API_URL}/sse`, {
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
