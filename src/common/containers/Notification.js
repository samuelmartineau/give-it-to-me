import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class Notification extends Component {

    state = {
      open: false
    }

    handleRequestClose() {
        // todo dispatch notification reset
    }

    render() {
        const {success, message = '', open = false} = this.props;

        return (
            <Snackbar
              open={open}
              message={message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
        );
    }
}

export default connect(state => ({
    ...state.notification
}))(Notification);
