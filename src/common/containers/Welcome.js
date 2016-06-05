import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

class Welcome extends Component {
  render() {
    const {wines} = this.props;
    return (
      <Paper zDepth={1}>
        {wines.length} bouteilles
      </Paper>
    );
  }
}

function mapStateToProps(state) {
    return {
        wines: state.cellar.wines
    }
}
export default connect(mapStateToProps)(Welcome)
