import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

class Add extends Component {
  render() {
    return (
        <Paper zDepth={1} >
            Add
        </Paper>
    );
  }
}

function mapStateToProps(state) {
    return {
        wines: state.cellar.wines
    };
}
export default connect(mapStateToProps)(Add);
