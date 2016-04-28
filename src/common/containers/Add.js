import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import CellarSchema from '../components/CellarSchema';
import UploadPicture from '../components/UploadPicture';

class Add extends Component {
    render() {
        return (
            <div>
                <CellarSchema {...this.props} />
                <Paper zDepth={1} >
                    Add
                </Paper>
                <UploadPicture {...this.props} />
            </div>
        );
    }
}

export default connect(state => ({
    wines: state.cellar.wines,
    upload: state.upload
}))(Add);
