import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import CellarSchema from '../components/CellarSchema';
import * as paperStyle from '../styles/paper';
import WineAddingForm from '../components/WineAddingForm';

class Add extends Component {
    render() {
        return (
            <div>
                <CellarSchema {...this.props} />
                <Paper zDepth={1} style={paperStyle.paper}>
                  <WineAddingForm {...this.props} />
                </Paper>
            </div>
        );
    }
}

export default connect(state => ({
    wines: state.cellar.wines,
    upload: state.upload
}))(Add);
