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
        const {success, message = '', open = false} = this.props;
        const backgroundColor = this.props.hasOwnProperty('success') ? open ? 'green' : 'red' : 'transparent';

        return (
            <Snackbar
              bodyStyle={{backgroundColor}}
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
