import React, {Component} from 'react'
import {connect} from 'react-redux'

import WineCard from '../components/WineCard'
import SearchFilter from '../components/SearchFilter'

class Search extends Component {
  render () {
    const {wines, basketWineDictionary} = this.props
    return (
      <div>
        <SearchFilter />
        <div style={{
          textAlign: 'center'
        }}>
          {wines.map((wine, index) => <WineCard {...this.props} key={index} wine={wine} basketWine={basketWineDictionary[wine.id]} />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const basketWineDictionary = state.basket.reduce((acc, basketWine) => {
    acc[basketWine.wineId] = basketWine
    return acc
  }, {})

  return {wines: state.cellar.wines, basketWineDictionary: basketWineDictionary}
}
export default connect(mapStateToProps)(Search)
