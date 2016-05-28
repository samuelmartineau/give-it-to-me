import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import CellarSchema from '../components/CellarSchema';
import * as paperStyle from '../styles/paper';
import WineAddingForm from '../components/WineAddingForm';
import CellsSelectors from '../components/CellsSelectors';

class Add extends Component {
    render() {
        return (
            <div>
                <Paper zDepth={1} style={paperStyle.paper}>
                    <WineAddingForm {...this.props} />
                </Paper>
                <CellarSchema {...this.props} />
                <CellsSelectors {...this.props}/>
            </div>
        );
    }
}

export default connect(state => ({
    ...state.cellar,
    upload: state.upload
}))(Add);
