import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

class Welcome extends Component {
  render() {
    const {wines} = this.props;
    return (
      <Paper zDepth={1}>
        <div>Home sam</div>
        <ul>
            {wines.map((wine, index) => <li key={index}>{wine.name}</li>)}
        </ul>
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
