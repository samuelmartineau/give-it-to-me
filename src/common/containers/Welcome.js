import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Welcome extends React.Component {
  render() {
    const {wines} = this.props;
    return (
      <div>
        {wines.length} bouteilles
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        wines: state.cellar.wines
    }
}
export default connect(mapStateToProps)(Welcome)
