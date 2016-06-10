import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import WineCard from '../components/WineCard';

class Search extends Component {
  render() {
    const {wines, basket} = this.props;
    const basketWineDictionary = basket.reduce((acc, basketWine) => {
        acc[basketWine.wineId] = basketWine;
        return acc;
    }, {})
    return (
      <div>
        <div> TODO FILTER </div>
        <div style={{textAlign: 'center'}}>
            {wines.map((wine, index) => <WineCard {...this.props} key={index} wine={wine} basketWine={basketWineDictionary[wine.id]}/>)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        wines: state.cellar.wines,
        basket: state.basket,
    }
}
export default connect(mapStateToProps)(Search)
