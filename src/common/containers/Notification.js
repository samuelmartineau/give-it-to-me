import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import * as actions from '../actions';

class Notification extends Component {

    state = {
      open: false
    }

    handleRequestClose() {
        const {dispatch} = this.props;
        dispatch(actions.hideNotification());
    }

    render() {
        const {success, error, message = '', open} = this.props;
        let backgroundColor;
        if (open && success) {
            backgroundColor = 'green';
        } else if (open && error) {
            backgroundColor = 'red';
        }

        return (
            <Snackbar
              bodyStyle={{backgroundColor: backgroundColor}}
              open={open}
              message={message}
              autoHideDuration={6000}
              onRequestClose={this.handleRequestClose.bind(this)}
            />
        );
    }
}

export default connect(state => ({
    ...state.notification
}))(Notification);
