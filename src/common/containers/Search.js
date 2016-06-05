import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import WineCard from '../components/WineCard';

class Search extends Component {
  render() {
    const {wines} = this.props;
    return (
      <div>
        <div> TODO FILTER </div>
        <div style={{textAlign: 'center'}}>
            {wines.map((wine, index) => <WineCard key={index} wine={wine} />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        wines: state.cellar.wines
    }
}
export default connect(mapStateToProps)(Search)
